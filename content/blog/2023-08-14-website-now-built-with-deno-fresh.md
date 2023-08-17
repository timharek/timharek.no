+++
title = "timharek.no is now built with Deno Fresh"
description = "I switched out Zola with Deno Fresh."
[taxonomies]
tags = ["100 days to offload","Thoughts", "Deno", "Deno Fresh"]
+++

A while back I mentioned that I was in the process of remaking my website with
[Deno Fresh](https://fresh.deno.dev). I didn't do it with the intention of
actually switching from Zola, but here I am.

It took me quite a while to remake the whole website with Fresh, actually, I'm
not finished yet. I created a new page with what I have remaining:
[TODOs](/todo). I have a few things I want to do before I call myself finished.

The whole reason why I wanted to remake my website with Fresh was to learn more
about the framework. I have used the framework before, I currently using it for
my side-project, [Hima](https://sr.ht/~timharek/hima/), but not with a lot of
static Markdown-files etc. So I wanted to challange myself to remake the website
as close as possible.

## What I learned

To start of, it was not a small tasks to do this.

### Markdown

I had tried to work with Markdown with Deno Fresh in the past, and I remembered
it was a hassle for me because my Markdown-files uses TOML as its frontmatter
instead of the more common YAML. But to my surprise Deno's official [standard
library][deno_std] has a module for [front-matter with TOML][deno_toml].
However, since it took me so long to do this project, Deno has made an [official
guide for how to render Markdown][deno_md].

I had a goal in mind when I started the project, and that was that I didn't want
to change too much about my Markdown-files. And in the end I ended up not
needing to either. I created logic for retrieving Markdown-documents that where
made with [Zola's][zola] method, where you have a folder called `content`, where
you can create pages with `content/page.md` or `content/page/index.md`. And it
also has another concept for sections, which is basically a page with sub-pages.

For sections I ended up creating custom routes instead, since I didn't want to
reinvent the wheel and have a bunch of code that I have to refactor later
anyway.

Zola generates page properties based on the attributes you provide in each
Markdown-file. I had to create a system for this to work in Fresh as well. And
if I hadn't used Zola before and read its documentation a bunch of times, I
don't think I would've finished this project.

### Static files

In Zola I could store my images etc. alongside blogposts and I was able to
retrieve them and even do some image processing on them. But with Fresh I was
unable to do so. Therefore I had to move all my images from my blogposts (there
wasn't that many) into the `static`-folder.

If you know how I can store them alongside the blogposts outside of `static`,
please let me know!

### Built-in functions

After a while I realized that Zola has a lot of great stuff built-in. Like
functions for grouping stuff by other properties/keys, word counts, reading time
etc. And there aren't that many minimal packages or modules for this (that I
could find) – so I created them myself, which was a fun learning experience.

But there are other stuff that I didn't recreate (yet), like backlink support.
This is something I found really useful with my Zola-site. But my mind needs to
think about how I can achieve the same result.

### Localization

Localization isn't supported directly in Fresh. And luckly for me I hadn't made
that many pages or posts in Norwegian. Therefore I removed all the Norwegian
static pages and kept the digital garden pages and blogposts.

### Styling

I discared all of my old styles and used a Tailwind in JS framework called
[Twind][twind], which is natively supported in Fresh. It was such a breeze
creating all of the routes. No more thinking about what I should call this and
that class etc.

### Redirects

Like I mentioned for localization, I removed pages, and I don't want to have
dead links, and I also moved some pages around, therefore I made a system for
having redirects in Fresh. The only thing I need is a `redirects.json`-file like
this:

```json
[
  "/old/path": "/new/path"
]
```

In Fresh's `middleware.ts` I'm able to write a short conditional for checking if
the current path is in the redirects:

```ts
const redirect = redirects[url.pathname]
if (redirect) {
  return new Response(null, {
    status: Status.SeeOther,
    headers: {
      Location: redirect,
    },
  })
}
```

### Self-hosting

I don't think there are a lot of people even thinking about self-hosting
Deno-projects because Deno Deploy is so easy to use. But I, however, want to
have full control over my stuff. So I'm running Deno Fresh with
[systemd][systemd] with a [Caddy][caddy] server with a reverse proxy. And it
works great! I will write a follow up blogpost about that at a later date.

## Final thoughts

I'm really glad I did this. I feel like I learned so much. Some of the stuff I
learned I have applied directly to projects I'm working on at work and during my
spare-time. And the Fresh's [documentation][fresh_docs] keep getting better and
better.

And I'm not finished remaking the website just yet. I just had to deploy it so
I'm able to see how to page lives.

And if you see something that's broken or you just want to say hello, please
don't hesitate to reach out! :)

[deno_std]: https://deno.land/std
[deno_toml]: https://deno.land/std@0.198.0/front_matter/toml.ts
[deno_md]: https://fresh.deno.dev/docs/examples/rendering-markdown
[twind]: https://twind.style/
[fresh_docs]: https://fresh.deno.dev/docs/introduction
[zola]: https://www.getzola.org/
[systemd]: https://en.wikipedia.org/wiki/Systemd
[caddy]: https://caddyserver.com/
