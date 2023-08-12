+++
title = "July 2022"
description = "What I've been up to in July."
[taxonomies]
tags = ["Recently"]
+++

## Goals from last month

- _Read at least 1 new book_: I finished Ruined by design, by Mike Monteiro and
  I read a comic book, Thor: God of Thunder (2013) #1 - #11.
- _Write at least 1 new post_: I've written two
  - [How to keep your e-mail organized][howtoemail]
  - [I don't use notifications for everything][notifications].

## What I've been up to

### Homelab

There was a new addition to my homelab in July, a 3D printer! I came across some
YouTube videos and watched a lot of them, realized that this is something I
could use, so I checked online here in Norway if any retailer sells the models
that they recommend for beginners - and well, they do! I ended up buying the
**Creality Ender 3 S1 V1**. I've made a few prints with it, it takes time and
has taken some time adjusting the settings so that it does everything correctly
all the time. My first creation was a mop-holder for our mop, I used my calipers
and measured everything to their exact dimensions and downloaded
[FreeCAD][freecad]. I'd never used FreeCAD before, but I had taken a course in
AutoCAD LT back in 2013 - so I thought I could handle it. And to my surprise I
did, but nothing advance, I'm still trying to figure everything out and finding
out how I can save as much time as possible with my designs. Hopefully in
August's post I'll have some files to share, until then you can check out my
custom-designed mop-holder!

<figure>
  <img
    src="/img/blog/2022-08-01-2022-july-recently/mop_overview.jpeg"
    alt="My mop hanging in the closet. Photo">
  <figcaption>
    My first custom 3D design, a mop holder.
  </figcaption>
</figure>

However, I've been struggling a bit with the printer as well. The UI is not the
best and the instructions that came included was missing some stuff. You see,
there is a function on the printer that's called "LEVEL" which is for "Auto Bed
Leveling". What the instructions don't tell you is that you need to do a whole
lot of manual adjustment before you can do this so-called "auto" thingy. Took me
awhile to figure that one out.

### Software / Development

I suddenly had a desire to rewrite my `.vimrc` into Lua since I'm using
[Neovim][nvim] full time now. It was a lot more manageable than I thought, and
the result was that I needed to replace a few plugins but nothing major. It was
a fun learning experience.

I came across a blogpost about `Makefile`'s. I always been scared to try to use
them, but this blogpost made me realize that they can be super useful! [How to
create a self-documenting Makefile][makefile_blogpost] taught me how to use
`Makefile`'s in a simple manner, and now I updated my dotfiles-repo to use a
`Makefile` instead of relying on many different shellscripts.

[restic][restic] is something I've been looking at as a backup-alternative for
my servers instead of relying on `rsync`. I need to run more dry-runs and test
to make sure everything will go smoothly.

### Website

[Zola v0.16.0][zola-release] came out! My site now supports backlinks! I'm
looking forward to seeing Zola evolve more in the future.

And I guess I'm never going to be finished with my website, there is always
something to tinker with and improve. I came across someone called [Luke
Harris][lukeharris], I was intrigued by their blogposts and site. I noticed they
had a little page in the footer called _stats_. I read the blogpost about it and
was inspired to create one myself, as you may have noticed, unless you're
reading from an RSS-reader, I also have my own dedicated
[stats](@/stats.md)-page now. It's not as sophisticated as Luke's, but I like
how it turned out.

Also, I added a [work][work]-page. Not quite done with it yet, but at least now
it exists on my website. It features most of my projects and even has a simple
filter with search-parameters.

All of my logs, and by all I mean two is now moved from inside the
`content`-folder in Zola to the `static`-folder inside an `api`-folder, so now I
can query my own logs from anywhere! You can for example see my endpoint for my
watched TV-shows [here][api-endpoint].

My CV now uses the [JSON Resume schema][jsonresume], I extended it a tiny bit to
allow for logos and when it was last updated. There shouldn't been any
noticeable difference on my [CV-page][cv]

## What's next?

My vacation is coming up so I don't have anything planned, I might blog a bit
about my new 3D printer and my newbie experiences with it.

I'm not setting any goals this time,

[howtoemail]: @/blog/2022-07-11-organized-email.md
[notifications]:
  @/blog/2022-07-14-why-i-dont-use-notifications-for-everything.md
[freecad]: https://www.freecad.org
[nvim]: https://neovim.io/
[lukeharris]: https://www.lkhrs.com/
[api-endpoint]: /api/tv_shows.json
[makefile_blogpost]:
  https://victoria.dev/blog/how-to-create-a-self-documenting-makefile/
[restic]: https://restic.net/
[zola-release]: https://github.com/getzola/zola/releases/tag/v0.16.0
[work]: @/work/index.md
[jsonresume]: https://jsonresume.org/schema/
[cv]: @/about/cv/index.md
