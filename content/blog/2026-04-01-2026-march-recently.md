+++
title = "March 2026"
description = "What I've been up to since February 2026."
tags = ["Recently"]
updatedAt = 2026-04-10
+++

I must be getting older, because it feels like I just wrote my previous
[recently](/tags/recently)-update. I must've kept busy this month, let's dive
in!

From the blog since my last recently post:

- [Hudd review](/blog/hudd-review)

## 🍀 Life

Our new house is still amazing, we're settling more and more in every day. A
couple of days ago we bought new mattresses to our old bed, and what the actual
fuck, the first night was an adjustment, but tonight, I can't remember the last
time I slept like this. The old mattresses were a bit on the old side, more than
10 years old, so I guess something had to change sooner or later.

Things have been grinding at work as well, been busy with different projects,
still writing a lot of Go. And it was officially announced that the company I
work for, Value Technology (part of Value Group), will be merged into a new
company called Enora. Now we go from 2 developers to 40+. And we have already
started to get incorporated with Enora, really looking forward to what's next!
There was a huge reveal-party in Oslo, where both Value Group and Enora
(previously Tower NewCo) were presented with the new name for both companies. I
now have more than one thousand coworkers, this is the biggest company I have
ever worked for. I was just getting used to 300+. Things move fast!

## 💪 Health

I have been on a few runs since last month, and I have been working out
semi-regularly in the garage in the new home-gym! Right now this feels
sustainable, and it's something that works. And when our next kid comes, I won't
have to leave the "house" to go to workout.

## 🧑‍💻 Development

I have done quite a few things on the development side this month. Here is my
attempt to summarise it.

### Lyn

I'm still exchanging emails with the person who had a bunch of cool ideas from
last month, and even got a new email today from someone else suggesting adding
sunrise/sunset to the `lyn now` output. Here's what I have done:

- Added clothing advisor, `--wear`. Static rules.
- Added alerts command, `lyn alerts`. Fetches active weather alerts.
- Added weather change warnings. Detects notable weather changes automatically.
- Added "Feels like" wind chill. Only appears when it differs from actual
  temperature.
- Added dewpoint comfort levels.
- Added Fitzpatrick skin type, `--skin-type`.
- Added cloud cover, `--cloud`. Surfaces cloud cover, 0-100%.
- Added sun protection assessment. Combination of UV index with cloud cover and
  skin-type. Includes sunscreen/sunglasses recommendations and safe exposure
  time.
- Added MCP server, `lyn mcp`.
- Added sunrise/sunset, `--sun`.
- Include sunrise/sunset in cache.
- Added option to configure cache path, `--cache-dir`.

### `art` and timharek.no

I changed how my logs work. Instead of being in different JSON-files, all the
logs now reside in a single `logs.toml` file. This is how `art`-CLI and
`timharek.no` now works.

I also changed how I log stuff with `art`, instead of doing
`art watched movie add`, I now do `art movies add`.

### HandyMKV

By accident I discovered
[`handymkv`][handymkv: A tool to simplify use of MakeMKV and the HandBrakeCLI tool]
on Hacker News, and I also went shopping for a bunch of Blu-rays the other day.

So after trying out the CLI I discovered a couple of things I wanted to improve,
mainly autocomplete, `handymkv completion`, and the ability to redo/retry an
encoding, `handymkv redo`.

The fastest way to achieve autocomplete, and the most logical way in my opinion,
was to use the very popular CLI-framework Cobra. But my
[PR#11](https://github.com/dmars8047/handymkv/pull/11) was sadly denied, because
the maintainer wants a zero-dependency CLI. Which is understandable. However,
they were interested in my redo-implementation, so I opened another
[PR#12](https://github.com/dmars8047/handymkv/pull/12) with the redo stuff.

My plan now is to maintain a fork of `handymkv` on
[Sourcehut](https://git.sr.ht/~timharek/handymkv), that has Cobra and other
stuff that I want to add to the tool. I also want to be able to pull from
upstream, so the fork won't deviate too much. Check out my fork on Sourcehut,
report bugs, features, etc. I really want the best ripping and encoding
experience.

And huge thanks to the maintainer,
[Daniel Marshall](https://www.dmarshall.dev/), of the original project, it was a
lot simpler ripping and encoding my rips this time, compared to last time. Now I
don't have to tinker in some UI, now I just have to select the title from a disc
and let the CLI do the rest.

### Upcoming project

A friend and I, mostly my friend, are working on a new project. It's still early
days, I have teased it for some other friends, but it's coming along. It's a
full stack application written completely in Go, using everything we've learned
since starting using Go. It has a lot of niceties. Hopefully I get to tease it
more in next months update, because I think a lot of people will find it useful.

## 🎬 Entertainment

From my [logs](/logs).

### Movies

- **Forevergreen (2025)** – Fantastic, heartfelt short-film.
- **Snatch (2000)** – Rewatch. I like dags!
- **Naboer (Next Door) (2005)** – Subtle hints throughout the film. I don't
  think I have ever seen a Norwegian movie like this. And the setting and
  overall story is so bizarre.
- **Scream 7 (2026)** – This was not worth it.
- **Project Hail Mary (2026)** – Fantastic movie! Fist my bump!
- **Send Help (2026)** – The premise seemed really cool, the start of the movie
  was OK, but something was off. And then the whole movie became more and more
  strange... I didn't like this, at all.

### TV

Started watching **Invincible S4**, what a fucking show! We also started
watching two different shows about detectives, both well known, **Detective Hole
S1** and **Young Sherlock S1**.

- **Ølhunden Berit (A Better Man) S1** – The first episode didn't click. But
  people kept recommending this, so I gave it another chance. It turns out this
  was pretty good. We live in a fucked up world.

### Games

- **Esoteric Ebb (2026)** – The dialogue in this game is amazing. I told
  everyone I was apolitical all the time, and I had heated discussions with my
  Intelligence throughout the game. A lot of interesting characters, the world
  was not too big, nor too small. It was perfect. Ran flawlessly on the Steam
  Deck.

## 🌐 Links

- [Don't Let AI Write For You] – Do the work! You don't get muscles by using an
  excavator to dig for you.
- [Working software runs locally] – Everything I make has to run locally, and be
  easy to run. I have worked on projects where this is not the case, and it's
  not fun to debug in production or staging.
- [handymkv: A tool to simplify use of MakeMKV and the HandBrakeCLI tool] – I
  just did this by hand last week and the week before. Why didn't I know about
  this?
- [Shell Tricks That Actually Make Life Easier (And Save Your Sanity)] – I have
  never used CTRL + U and CTRL + Y before, where have you been all my life!
- [Willingness to look stupid is a genuine moat in creative work] – Let's look
  stupid together!
- [lazycut: A simple terminal UI for video trimming.] – This is awesome!
- [Have a Fucking Website] – Yes, please!
- [Remove Your Ring Camera With a Claw Hammer] – This was a great read.
- [The dead Internet is not a theory anymore.] – I see the author's point, and I
  have been on the receiving end of the slop myself, but there are so much more
  to the internet than slop like this. Let's do something about it.
- [“It turns out”] – It turns out this is a great post about a great phrase!
- [How can I communicate better with my mom?] – Anthropic really nails it here.
- [Everything changes, and nothing changes] – It's indeed a strange time to be a
  software engineer!
- [Nobody Gets Promoted for Simplicity] – "Simplicity is a great virtue, but it
  requires hard work to achieve and education to appreciate. And to make matters
  worse, complexity sells better."

[Don't Let AI Write For You]: https://alexhwoods.com/dont-let-ai-write-for-you/
[Working software runs locally]:
  https://nickmonad.blog/2026/working-software-runs-locally/
[handymkv: A tool to simplify use of MakeMKV and the HandBrakeCLI tool]:
  https://github.com/dmars8047/handymkv
[Shell Tricks That Actually Make Life Easier (And Save Your Sanity)]:
  https://blog.hofstede.it/shell-tricks-that-actually-make-life-easier-and-save-your-sanity/
[Willingness to look stupid is a genuine moat in creative work]:
  https://sharif.io/looking-stupid
[lazycut: A simple terminal UI for video trimming.]:
  https://github.com/emin-ozata/lazycut
[Have a Fucking Website]:
  https://www.otherstrangeness.com/2026/03/14/have-a-fucking-website/
[Remove Your Ring Camera With a Claw Hammer]:
  https://www.hamiltonnolan.com/p/remove-your-ring-camera-with-a-claw
[The dead Internet is not a theory anymore.]:
  https://www.adriankrebs.ch/blog/dead-internet/
[“It turns out”]: https://jsomers.net/blog/it-turns-out
[How can I communicate better with my mom?]:
  https://www.youtube.com/watch?v=FBSam25u8O4
[Everything changes, and nothing changes]:
  https://btao.org/posts/2026-02-28-everything-changes-nothing-changes/
[Nobody Gets Promoted for Simplicity]:
  https://terriblesoftware.org/2026/03/03/nobody-gets-promoted-for-simplicity/
