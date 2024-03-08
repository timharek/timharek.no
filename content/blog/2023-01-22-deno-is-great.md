+++
title = "Deno is great"
description = "What is Deno, how do I use it and should you even consider it?"
updated = 2023-01-25
tags = ["Deno", "Software", "100 days to offload"]
+++

## What is Deno?

[Deno][deno] is a secure alternative to [Node.js][nodejs]. Scratch that, Deno is
a easy to understand JavaScript runtime with batteries included! You install
dependencies once, globally, no `package.json` and TypeScript is available out
of the box! It's fast, it uses Chrome's V8 JavaScript engine which means it has
the same features as a browser. And there's so much more!

## How do I use Deno?

I use it for anything, it's so quick to setup. I make a new folder and add a
JavaScript/TypeScript-file and I can just run `deno run <filename>` and it just
works!

Some projects I've used it for:

- This very website, I have some [scripts][th_scripts] for updating my logs.
- [d-yr][dyr]: Weather CLI and module.
- [deno-books][dbooks]: OpenLibrary CLI and module.
- [wcarbon][wcarbon]: Website Carbon CLI for checking how heavy sites are.
- [deno-omdb][omdb]: OMDb CLI and module for checking movies and TV shows.

I use these project regularly, especially `d-yr` - it's a super fast way to
check the current weather. And whenever I need to try something out with
JavaScript I just fire up Deno's Repl and play around with it.

## Should you try it?

If you work with Node.js and are tired of setting up linting, formatting, types
etc. then you should most definitely try Deno!

[deno]: https://deno.land
[nodejs]: https://nodejs.org/en/
[th_scripts]: https://git.sr.ht/~timharek/timharek.no/tree/main/item/scripts
[dbooks]: https://git.sr.ht/~timharek/deno-books
[dyr]: https://git.sr.ht/~timharek/d-yr
[wcarbon]: https://git.sr.ht/~timharek/wcarbon
[omdb]: https://git.sr.ht/~timharek/deno-omdb
