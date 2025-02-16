+++
title = "Colophon"
description = "How my website is made, with what tools and technologies."
updatedAt = 2025-02-15
+++

A colophon is a page or section, like a footer, of a site that describes how the
site is made, with what tools, supporting what technologies. See
[Wikipedia](<http://en.wikipedia.org/wiki/Colophon_(publishing)>) for more
details.

## TL;DR

This website is built using [Hugo] by yours truly. It's hosted on a [1984
Hosting] VPS.

Source code is available on [SourceHut].

Proud member of:

- [1MB club][1mb]
- [512KB club][512kb]

[1mb]: https://1mb.club
[512kb]: https://512kb.club

## The stack

|                             |                    |
| :-------------------------- | :----------------- |
| Static site generator (SSG) | [Hugo]             |
| Hosted on                   | [1984 Hosting] VPS |
| Reverse-proxy               | [Caddy]            |
| Source code hosting         | [SourceHut]        |
| Automatic deployment        | [SourceHut builds] |

## Site structure

- [Blog] with [tags]
- [Blogroll] based on [OPML]
- [CV]
  - Based on [JSON schema], but with TOML
  - Seperate [projects]-page with filter
- [Logs] stored in JSON-files, which also are available as static-files
  - Watched movies, TV shows
  - Read books
  - Played video games
  - Travels

[blog]: /blog
[tags]: /tags
[cv]: /cv
[projects]: /projects
[logs]: /logs
[json schema]: https://jsonresume.org/
[blogroll]: /blogroll
[opml]: https://opml.org/spec2.opml
[Tailwind]: https://tailwindcss.com/
[1984 Hosting]: https://1984hosting.com
[Hugo]: https://gohugo.io
[SourceHut]: https://git.sr.ht/~timharek/timharek.no
[SourceHut Builds]: https://builds.sr.ht/
[Caddy]: https://caddyserver.com/
