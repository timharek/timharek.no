+++
title = "I added well-known URLs to my website"
description = "Both for the sake of just doing it, and being able to see stuff at a glance."
tags = ["Domain", "Meta", "100 days to offload", "Projects"]
+++

I've been reading [Jim Nielsen's blog][jim_blog] for a while. He writes about
all sorts of interesting stuff, and one thing I recall standing out to me was
two of his posts about using [Well known URI's][wk_wiki] for [outgoing
links][jim_links] and [for your personal avatar][jim_avatar].

And after I
[remade my website with Deno Fresh](/blog/website-now-built-with-deno-fresh) I
thought I should try to add those to my site as well. And now I have!

## Outgoing links

You can go to
[timharek.no/.well-known/links](https://timharek.no/.well-known/links) and
you'll see all the outgoing links for my website. They are even sorted by how
many times each domain appears. You can also use a query parameter to check if I
link to your website (like Jim's), like this:
[timharek.no/.well-known/links?domain=github.com](https://timharek.no/.well-known/links?domain=github.com)

My solution is much different from Jim's, because I don't use
[marked.js][marked.js]. I had to render out all my Markdown first, then do some
DOM-query selector logic in order to filter out both internal and outgoing
links. I didn't read the blogpost before I had written all the code 😅 So I
might switch out [Deno GFM][deno_gfm] in the future.

And my solution is missing the property `sourceUrl` which is useful to see where
the different links appear. This is on my [todo-list](/todo)!

## Personal avatar

You can go to
[timharek.no/.well-known/avatar](https://timharek.no/.well-known/avatar) and you
should see my face :) Here I don't have any query parameters, yet. It could be
interesting to add some like `?accessories=glasses` or `?type=logo`.

And my solution was just a few lines of TypeScript with Deno.

```typescript
const avatarPath = new URL("../../static/img/me.jpeg", import.meta.url)
try {
  const avatar = await Deno.readFile(avatarPath)

  return new Response(avatar, {
    headers: { "content-type": "image/jpeg" },
  })
} catch (error) {
  console.error(error)
  return new Response(JSON.stringify({ message: "No avatar available." }), {
    headers: { "content-type": "application/json; charset=utf-8" },
  })
}
```

I might not even need the try-catch, but I like to be safe – just in case.

## Conclusion

I like the idea of well-known URIs, it would be an easy way to keep stuff a bit
more standardized, which could come in handy for blogs etc. And it makes
checking for URL errors easier, and it gives me a standard way to know where I
keep my avatar.

I might have to check out more well-known URIs to implement them to my site(s)
as well.

[jim_blog]: https://blog.jim-nielsen.com/
[wk_wiki]: https://en.wikipedia.org/wiki/Well-known_URI
[jim_links]: https://blog.jim-nielsen.com/2022/well-known-links-resource/
[jim_avatar]: https://blog.jim-nielsen.com/2023/well-known-avatar/
[marked.js]: https://marked.js.org/
[deno_gfm]: https://github.com/denoland/deno-gfm
