+++
title = "Use Markdown with Markdown"
description = "And what I learned when I didn't."
[taxonomies]
tags = ["Markdown", "Thoughts", "100 days to offload"]
+++

Earlier this week I published my rewritten website made with Deno Fresh. I wrote
about the process and what I learned, but there was one thing I left out – and
that was a key detail about Markdown.

Recently I've read blogposts about Markdown. Both [Steph Ango][ango_post] and
[Marius Hauken][hauken_post] touch on why it's important to use and choose
something that you know'll last, and something that you can own. And Markdown is
true for both. But there are some stuff to keep in mind.

In my case I quickly discovered that I had used [Zola's shortcodes][zola_sc] a
bunch, for a lot of different stuff, in order to stay consistent across my
blogposts. A downside with that is that these shortcodes are not Markdown. They
inject HTML when the site is built into HTML-files. And that can be good thing,
but if you want to keep your Markdown-files alive for a long time, it won't
work.

I used the shortcodes for stuff like adding images with captions,
alerts/information boxes etc. But when it came to the rewrite for Deno Fresh I
had to bring in a Markdown-parser, and these shortcodes were not supported. And
I don't think they'll ever be. Therefore I pulled out all of them and either
replaced them with plaintext or HTML. Because HTML like `<figure>`,`<img>` etc.
are widely supported. And then I'm able to keep my Markdown useable and
[accessible in the future][rupert_post]. And I could also use more SVGs in
future posts, those will also continue to stay supported.

So if you know you have used something similar to Zola's shortcodes, like Hugo
etc., please keep this in mind. You don't have to remove the shortcodes/custom
code, but remember that it's not native Markdown.

[ango_post]: https://stephanango.com/in-good-hands
[hauken_post]: https://hauken.io/lindy/
[zola_sc]: https://www.getzola.org/documentation/content/shortcodes/
[rupert_post]: https://daverupert.com/2023/05/markdown-images-anti-pattern/
