+++
title = "November 2022"
description = "What I've been up to since October."
[taxonomies]
tags = ["Recently"]
+++

## ✍️ Blog

I've been a bit more busy this last month, or at least I think I have. When I
think about it now I realize that I have updated my website quite a bit since
last month. I did however manage to sneak in a blogpost on Black Friday: [I
didn't buy anything on Black Friday][black_friday_post].

## 🌐 Website

When I do a `git log --since "Oct 31 2022" --until "Dec 2 2022"` I see that I
have done quite a bit, 59 commits, mostly small things, but I have also done
some changes.

- I moved all my stuff from my [Work][work]-page to my `cv.json` that I use for
  my CV that is based on [JSONResume-schema][resume_schema].
- I added a CSS-rule for external links.
- Updated my [Uses][uses]-page with new tools.
- Added a new page [Timeline][timeline], which is a culmination of all my
  [logs][logs].
- Moved the build of my website from self-provisoned Git-hooks to
  [SourceHut][sourcehut].

## 🎮 Gaming

Like I mentioned last month I was excited for God of War: Ragnarök. And yes, it
was simply amazing. I really liked their take on the Norse stories, there's a
lot of similarities and quite a few places where they've changed some stuff. I
loved it!

## 💪 Health

Not keeping up the frequency as much as I wanted, but I did sign up for one
half-marathon, that I finished today, and six others next year. So I'm looking
forward to keeping up with the running and (hopefully) getting better results
after each one!

## 👨‍💻 Development

### Deno

I finally got to try out [Deno Fresh][deno_fresh] and I'm impressed! I ported
over my blogposts and it kinda just worked. Initially I used the wrong parser
for the TOML-frontmatter and it took me longer than I like to admit to realize I
was using a deprecated parser from Deno's Standard Library.

I also started working on a CLI for Migadu written with Deno and
[Cliffy][cliffy], hopefully I'm able to finish it this month.

### At work

At work this month I started working on two different projects that involves a
lot of API-integrations and I'm learning so much! We're creating our own clients
that interacts with different API's and we're using different API's to
integrates with systems from the 90s. It's exciting!

## 🎬 Entertainment

### TV

Didn't finish any shows this month, but we started watching **Black Bird** on
Apple TV+ and I'm impressed so far into two episodes.

### Movies

- **Barbarian** &mdash; Wow, finally a horror movie that actually delivers! I
  felt like I was constantly surprised at every turn, it wasn't super scary, it
  was smart!
- **Black Panther: Wakanda Forever** &mdash; Disspointed. Namor was cool, but
  the story didn't really work.
- **Krigsseileren** (War Sailor) &mdash; Sad and devastating movie. It was
  difficult to watch, especially since it's so close to home. Some of the movie
  is based in the town where I live during World War 2.
- **The Guardians of the Galaxy Holiday Special** &mdash; Meh, it had some cool
  details, and I felt like _I had to_ watch it.

[black_friday_post]: /blog/i-didnt-buy-anything-on-black-friday
[work]: /work
[uses]: /uses
[logs]: /logs
[timeline]: /logs/timeline
[resume_schema]: https://jsonresume.org/
[cliffy]: https://cliffy.io
[deno_fresh]: https://fresh.deno.dev/
[sourcehut]: https://sourcehut.org
