import { Handlers } from "$fresh/server.ts";
import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

type ImageType = "jpg" | "png";

export const handler: Handlers = {
  OPTIONS(_req, _ctx) {
    const headers = new Headers();
    headers.set("Allow", "GET, OPTIONS");
    headers.set("Params", "type: 'jpg' | 'png', size: number, quality: number");
    return new Response(null, { headers });
  },
  async GET(req, _ctx) {
    const avatarPath = new URL("../../static/img/avatar.jpg", import.meta.url);
    const params = new URL(req.url).searchParams;
    const type = params.get("type") as ImageType | null;
    const size = params.get("size") as number | null;
    const quality = params.get("quality") as number | null;
    try {
      const DEFAULT_IMAGE_TYPE = "jpg";
      const DEFAULT_IMAGE_SIZE = 200;
      const DEFAULT_IMAGE_QUALITY = 100;
      const avatarUncompressed = await Deno.readFile(avatarPath);
      const avatar = await compressImage({
        uncompressedImage: avatarUncompressed,
        type: type ?? DEFAULT_IMAGE_TYPE,
        width: size ? size : DEFAULT_IMAGE_SIZE,
        quality: quality ? quality : DEFAULT_IMAGE_QUALITY,
      });

      return new Response(avatar, {
        headers: { "content-type": `image/${type ?? DEFAULT_IMAGE_TYPE}` },
      });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: "No avatar available." }),
        {
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    }
  },
};

interface CompressProps {
  uncompressedImage: Uint8Array;
  type: ImageType;
  width: number;
  quality: number;
}

async function compressImage(
  { uncompressedImage, width, type, quality }: CompressProps,
) {
  const image = await Image.decode(uncompressedImage);
  const imageResized = image.resize(width, Image.RESIZE_AUTO);

  const tmpPath = await Deno.makeTempFile({ suffix: `.${type}` });
  if (type === "jpg") {
    await Deno.writeFile(
      tmpPath,
      await imageResized.encodeJPEG(quality),
    );
  } else if (type === "png") {
    await Deno.writeFile(tmpPath, await imageResized.encode(3));
  }

  const tmpFile = await Deno.readFile(tmpPath);
  return tmpFile;
}
