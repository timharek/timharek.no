import { parse } from "xml";
import { z } from "zod";

interface Point {
  lat: number;
  lon: number;
}

interface Coordinates {
  x: number;
  y: number;
}

const gpxSchema = z.object({
  xml: z.object({
    "@version": z.number(),
    "@encoding": z.literal("UTF-8"),
  }),
  gpx: z.object({
    "@version": z.number(),
    "@creator": z.string(),
    "@xmlns": z.string().url(),
    "@xmlns:xsi": z.string().url(),
    "@xsi:schemaLocation": z.string(),
    trk: z.object({
      trkseg: z.object({
        trkpt: z.array(z.object({ "@lat": z.number(), "@lon": z.number() })),
      }),
    }),
  }),
});

async function readGPX(filePath: string): Promise<Point[]> {
  const gpxData = await Deno.readTextFile(filePath);
  const xml = gpxSchema.parse(parse(gpxData));

  const points: Point[] = [];

  const trkptElements = xml.gpx.trk.trkseg.trkpt;
  for (const trkptElement of trkptElements) {
    const lat = trkptElement["@lat"] || 0;
    const lon = trkptElement["@lon"] || 0;
    points.push({ lat, lon });
  }

  return points;
}

// Calculate scaling factor and translate coordinates to fit SVG bounds
function normalizeCoordinates(
  points: Point[],
  svgWidth: number,
  svgHeight: number,
): { x: number; y: number }[] {
  // Find min and max latitude and longitude
  let minLat = Infinity,
    maxLat = -Infinity,
    minLon = Infinity,
    maxLon = -Infinity;

  for (const { lat, lon } of points) {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
  }

  // Calculate scaling factor
  const latRange = maxLat - minLat;
  const lonRange = maxLon - minLon;
  const scaleFactor = Math.min(svgWidth / lonRange, svgHeight / latRange);

  // Translate and scale coordinates to fit SVG bounds
  const normalizedCoordinates = points.map(({ lat, lon }) => {
    const x = (lon - minLon) * scaleFactor;
    const y = (maxLat - lat) * scaleFactor;
    return { x, y };
  });

  return normalizedCoordinates;
}

function generatePolyline(coordinates: Coordinates[]): string {
  let polyline = "";
  for (const { x, y } of coordinates) {
    polyline += `${x},${y} `;
  }
  return polyline.trim();
}

function generateSvg(points: Point[]) {
  const svgPoints = normalizeCoordinates(points, 266, 266);

  const polyline = generatePolyline(svgPoints);

  const svgContent =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 266 266">
      <polyline points="${polyline}" fill="none" stroke="black" stroke-width="1" />
</svg>`;

  return svgContent;
}

// Example usage
const gpxFilePath = "./2024-03-16T09:13:03Z.gpx";
const points = await readGPX(gpxFilePath);
const svgContent = generateSvg(points);

await Deno.writeTextFile("output.svg", svgContent);
