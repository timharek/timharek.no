+++
date = 2021-10-11
title = "Trying out aerc"
description = """
After using Apple Mail for a while, I'm trying aerc as my new email client."""
[taxonomies]
tags = ["Email", "TUI"] 
+++

Yesterday I thought I should try to find a better alternative to Apple Mail on
macOS, because I've been missing good shortcuts (and vim ofc) when I navigate
my mailboxes and compose new emails. So I remembered I discovered
[`aerc`][aerc] earlier this year, so I gave it another look.

For those who don't know, `aerc` is a terminal based email client that uses 
vim-like bindings. It's very customizable and the configuration steps are easy
enough to understand. It supports plain text and html emails, but with HTML 
emails it requires an extra line of configuration in `aerc.conf`. You can find
my configurations [here][aerc-conf].

I setup my `aerc` for my personal emails to begin with, if I find it's not 
becoming an inconvenience after a few weeks of use I might try to add my work
email as well. But I guess I have to configure it some more if I'm going to use 
it for work, as I've already deleted some old emails by accident 😅.

[aerc]: https://aerc-mail.org/
[aerc-conf]: https://git.sr.ht/~timharek/dotfiles/tree/main/item/.config/aerc
