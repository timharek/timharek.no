import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const avatarPath = new URL("../../static/img/me.jpeg", import.meta.url);
    try {
      const avatar = await Deno.readFile(avatarPath);

      return new Response(avatar, {
        headers: { "content-type": "image/jpeg" },
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
