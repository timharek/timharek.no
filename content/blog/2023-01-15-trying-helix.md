+++
title = "Trying out Helix (editor)"
description = "After two years of Vim and Neovim, I discovered a new rabbit hole."
updatedAt = 2023-01-21
tags = ["100 days to offload", "Software", "Tools", "Helix"]
+++

Two years ago I discovered a course at MIT called [The Missing Semester of Your
CS Education][m_mit]. I learned a lot, a lot of stuff that I thought I was going
to learn during my degree. And when it came to their explanations and approach
to Vim, I was hooked! I started using Vim everyday, learning to add plugins,
looking at other peoples configs and so on. I eventually ended up switching to
Neovim last year and rewrote my config in Lua and I was happy. I was happy until
I actually tried out Helix.

I had heard of [Helix][helix] on Hacker News a few months back, but I didn't
think much of it until I watched this [video from the NeovimConf][neovim_vid]
about it. It has all (I think) of the plugins I use everyday just built in, the
keymaps are different, backwards even. But the whole editor feels so much more
fast, it might be placebo or it may be the fact that it doesn't rely on
supporting legacy stuff. Don't get me wrong, Vim/Neovim is great.

So this last few days I've been trying out Helix, there are a lot of things that
I need to re-learn, like how to delete lines, surrounding words, selecting
inbetween different characters etc. And that every action I do in normal mode is
basically selecting/highlighting.

It's been fun, I'm really taken aback by some of the keymaps, like undo/redo
which is `u`/`U` respectively. In Vim that would be `u`/`<C-r>` which also
works, but may seem backwards because a lot of the backwardness in modal-editors
seems to be lowercase and then uppercase. I dunno, I like it!

I spent time refactoring my scripts for my log-handling on my blog, and I used
Helix to get more comfortable with it. Since I mostly use Deno I quickly
realized that the TypeScript LSP is not good enough for Deno. However, getting
TypeScript to work with Deno's LSP was fairly straight forward. I switched out
JavaScript and TypeScripts LSP in the `langauges.toml`-config with Deno's, and
voila - it just worked!

I'm going to try to use Helix a bit more going forward, I really like the speed
and that I can easily understand my own config. I might keep posting about Helix
as my journey continues!

[m_mit]: https://missing.csail.mit.edu/
[helix]: https://helix-editor.com/
[neovim_vid]: https://youtu.be/tGYvUXYN-c0
