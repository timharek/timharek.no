+++
title = 'I accidentally went static again'
description = 'I ditched TypeScript and the server-side for a simpler website.'
tags = ['Meta']
+++

It took me 225 days to realize that I don't want to maintain my website with
TypeScript anymore. And that I don't need to server-side render my content.
Static is just fine.

Previously I have used [Jekyll] and [Zola], and now I switched from [Deno Fresh] to
[Hugo]. It took me about a week worth of time to migrate my whole website to Hugo,
and no one should be able to notice the difference. Everything looks the same,
same urls, same RSS-feeds and same look and feel.

However, I had to say goodbye to my
[`.well-known`-pages](/blog/i-added-well-known-urls-to-my-website/). These were
server-generated. I might be able to bring back `.well-know/links` in the future,
but as of now I'm not planning on it.

The process of migrating all my templates to Hugo was time-consuming. Go's
[html/template](https://pkg.go.dev/html/template) is good, but its syntax is
very different from other template-languages. It took a good while before I got
the hang of it.

If you've read my [recently](/tags/recently)-posts, you might remember that I
mentioned making my website with Go. This endeavor proceeded that. I don't want
to recreate everything again, at least not anytime soon.

## Lessons learned

Rewriting or remaking my website is a good way to trim off excess stuff. Most of
my website didn't have to be server-rendered, and I didn't need to serve all my
content as JSON in addition to HTML.

In terms of performance, you won't notice any huge improvements. Every page is
about ~40 kB lighter and ~150 ms faster. It's a bit, but not noticeable
(at least not for me).

I made a lot of good decisions when I made my website last time. I was amazed
that so much of my content just worked perfectly with Hugo. Especially my tags.
I thought I had to edit all of my blogposts and adjust my tags, but no. They
just worked™️. And Hugo had nice support for custom labels/prop-names for
`updatedAt` and so on.

## Final thoughts

I don't know why I did this, but it was fun. I have learned a lot. I highly
recommend checking out [Hugo] if you want to try a good static-site generator.

And if you notice anything broken, please don't hesitate to reach out! :)

[Jekyll]: https://jekyllrb.com/
[Zola]: https://www.getzola.org/
[Deno Fresh]: https://fresh.deno.dev/
[Hugo]: https://gohugo.io/
