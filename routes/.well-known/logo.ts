import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { jsonResponse } from "../../src/utils.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const logoPath = new URL("../../static/img/logo.svg", import.meta.url);
    try {
      const logo = await Deno.readFile(logoPath);

      return new Response(logo, {
        headers: { "content-type": `image/svg+xml` },
      });
    } catch (error) {
      console.error(error);
      return jsonResponse(
        { message: "No logo available." },
        STATUS_CODE.InternalServerError,
      );
    }
  },
};
