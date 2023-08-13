+++
title = "My thoughts on Helix after 6 months"
description = "What I like and don't like."
[taxonomies]
tags = ["100 days to offload", "Software", "Tools", "Helix", "Thoughts"]
+++

Back in [January][helix_post] I decided to try out Helix as my primary editor
and today I have almost been using it for 6 months and these are my thoughts.

## What I like

### Keystrokes

Helix lives in the opposite land when it comes to keystrokes in comparison to
Vim, and it was only difficult for the first couple of days. I've become fond of
the way to navigate around.

### Minor modes

I really like that there are more modes, called ["Minor
modes"][helix_minor_modes], and the reason why I like them are that whenever I
initate a mode there is a subtle pop-up in the lower-right corner with the
available actions with the activated mode. This is super helpful when you are
first learning Helix and when you are doing something you don't do on a regular
basis. It lowers the chance of having to switch context in order to do
something. For instance, I know that <kbd>m</kbd> activates "Match mode", but
sometimes I may forget how to select around specific selector like `()`, but
with Helix I will have a little helper that tells me that the next key is
<kbd>a</kbd> and then the next helper will help me select just `()`.

### Moving around

I've become really fond of the idea that every move-action is also a
selection/highlight, I find that I miss that feature whenever I edit
server-configs via SSH or somewhere else when I'm not in Helix. It feels natural
after a while because you get used to moving around text/code with <kbd>w</kbd>
and <kbd>e</kbd>.

### Configuration

No more Vimscript and Lua, just plaintext TOML! The documentation for how to
configure the editor is great and most of the defaults are also great! My
editor-config is just 23 lines in contrast to my Neovim-config which is 209
lines long.

### Language server protocol (LSP) support

I had some experience with this from Neovim, but it felt cumbersome having to
configure everything. With Helix I can simply run `hx --health markdown` and see
what LSP is required for Markdown.

```sh
$ hx --health markdown
Configured language server: marksman
Binary for language server: /opt/homebrew/bin/marksman
Configured debug adapter: None
Highlight queries: ✓
Textobject queries: ✘
Indent queries: ✘
```

I even managed to get it working with Deno thanks to its documentation on how to
use custom LSPs for specific languages.

## What I don't like

There really isn't anything in particualr that I don't like about Helix. I
really miss having it installed on servers by default, but I completely
understand that that is a big ask 😅 It's not too difficult to swap between
Vim-bindings and Helix-bindings for short sessions.

## Conclusion

Helix is fun and easy! I highly recommend Helix if you:

- want to try a new editor,
- tired of configuring {Neo}vim with Vimscript/Lua,
- or been thinking about trying out Vim, but been hesitant because of the modes.

I will continue to use Helix for the forseeable future, I'm looking forward to
what future updates will bring!

Remember to check out Helix's tutor, `hx --tutor` for quick introduction to its
keystrokes and interactions.

[helix_post]: /blog/trying-helix
[helix_minor_modes]: https://docs.helix-editor.com/keymap.html#normal-mode
