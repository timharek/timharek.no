+++
title = "All my Deno modules are now available on JSR"
description = "Why and how I did it without using GitHub Actions."
tags = ["Deno", "JSR"]
+++

I just finished publishing all [my Deno modules] to [JSR]. It's something I have
been looking forward to do, but I have been unable to do so because of some
limitations to JSR and because the CLI module I use for some of my modules
wasn't available on JSR. But now that has changed!

## Background

For those unfamiliar, [Deno] is a modern runtime for JavaScript and TypeScript
that offers enhanced security and improved developer experience. [JSR]
(JavaScript Registry) is a new platform for publishing JavaScript and TypeScript
modules, aiming to provide a more flexible and developer-friendly experience.

## Motivation

When JSR was first released in both closed and open beta, they only supported
automatic publishing via GitHub Actions, and I
[prefer SourceHut builds](/blog/switching-to-sourcehut-builds). There was a
mention of
[authentication tokens](https://jsr.io/docs/api#authentication-tokens) in their
docs, but no instructions on how to generate one. I opened a
[issue jsr#387](https://github.com/jsr-io/jsr/issues/387) which resulted in the
Deno/JSR team to create a
[new issue jsr#393](https://github.com/jsr-io/jsr/issues/393). And then a few
days ago I saw that the new issue was closed and that I was able to create
tokens in my JSR profile. So now I can publish to JSR with [SourceHut builds].

## Migration process

The process for how to migrate from [deno.land/x] to JSR was straight forward,
and I could always verify my "progress" with `deno publish --dry-run`. They even
have a guide for it:
[migrate from /x to JSR](https://jsr.io/docs/migrate-x-to-jsr).

## Challanges

One drawback that I see is that most of my modules relies on [Zod] for schema
validations (because most of my packages rely on a third-party API), and when I
use [Zod] I create something called [slow-types] which JSR doesn't like. And
there really isn't a way to get around it for now
[it seems](https://github.com/denoland/deno/issues/23126). So my JSR scores
usually isn't 100% because of it.

## Benefits

I appreciate how JSR doesn't require my modules to live on GitHub like
[deno.land/x] did. Although I still need a GitHub account to sign up for JSR, I
can archive my GitHub repos for the modules now. I also like how they have
solved the [scope](https://jsr.io/docs/scopes)/namespace issue with other
registries. I just used my default username, `timharek`, which makes it easy to
discover other modules I have published:
[jsr.io/@timharek](https://jsr.io/@timharek).

## Conclusion

I'm looking forward to see how JSR evolves and if more "big" modules/packages
migrate or mirror to JSR. I will definitely continue to use it for my needs.

What about you, have you tried or heard about [JSR]?

[my Deno modules]: /projects?tag=deno
[JSR]: https://jsr.io
[Deno]: https://deno.com
[SourceHut builds]: https://builds.sr.ht/
[deno.land/x]: https://deno.land/x
[Zod]: https://zod.dev/
[slow-types]: https://jsr.io/docs/about-slow-types
