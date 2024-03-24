import { parse } from "https://deno.land/x/xml@2.1.3/mod.ts";

// Define types for GPX data
interface Point {
  lat: number;
  lon: number;
}

interface Coordinates {
  x: number;
  y: number;
}

// Read GPX file
async function readGPX(filePath: string): Promise<Point[]> {
  const gpxData = await Deno.readTextFile(filePath);
  const xml = parse(gpxData);
  // console.log(JSON.stringify(xml, null, 2));
  // console.log("xml", xml.gpx);

  const points: Point[] = [];

  const trkptElements = xml.gpx?.trk?.trkseg?.trkpt;
  for (const trkptElement of trkptElements) {
    const lat = parseFloat(trkptElement["@lat"] || "0");
    const lon = parseFloat(trkptElement["@lon"] || "0");
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
