+++
title = "Using WezTerm with a Norwegian keyboard"
description = "How I use WezTerm."
tags = ["Terminal", "Tools", "WezTerm"]
+++

I recently switched to [WezTerm] from [iTerm 2] because of some performance
issues and I wanted to try something that works cross-platform. I remember
trying WezTerm a year or two back, but I couldn't remember why it didn't stick.

I usually use a US keyboard layout when I work in the terminal, with my
[Moonlander MK1] keyboard. And I'm a daily user of [tmux], and I loved that I
could finally use my Modifier-key reliably, which I was unable to in iTerm. But
when I used my laptop in "laptop-mode" (disconnected from an external keyboard),
I noticed that I was unable to write `|`, `{}` and `[]`. And then I remembered
why WezTerm didn't stick last time. But after I had to find out how to disable
`ALT+Enter`-shortcut in WezTerm, I knew the solution couldn't be far off.

Here's what I added to my config:

```lua
local wezterm = require 'wezterm'

-- ...

config.keys = {
-- Norwegian keys
  {
    key = '7',
    mods = 'ALT',
    action = wezterm.action.SendString "|",
  },
  {
    key = '8',
    mods = 'ALT',
    action = wezterm.action.SendString "[",
  },
  {
    key = '9',
    mods = 'ALT',
    action = wezterm.action.SendString "]",
  },
  {
    key = '(',
    mods = 'ALT|SHIFT',
    action = wezterm.action.SendString "{",
  },
  {
    key = ')',
    mods = 'ALT|SHIFT',
    action = wezterm.action.SendString "}",
  },
}

return config
```

And now I have a fully working keyboard again, yey! And if I encounter anything
else that doesn't work with the Norwegian keyboard-layout, I what to try!

For those who are curious on how I disabled `ALT+Enter`, this is what I added to
`config.keys`:

```lua
config.keys = {
  {
    key = 'Enter',
    mods = 'ALT',
    action = wezterm.action.DisableDefaultAssignment,
  },
}
```

My simple [WezTerm config] is available in my [dotfiles]. And you can find other
tools I use over on my [uses]-page.

Which terminal do you use?

[WezTerm]: https://wezfurlong.org/wezterm/index.html
[iterm 2]: https://iterm2.com/
[moonlander mk1]: https://www.zsa.io/moonlander
[tmux]: https://github.com/tmux/tmux/wiki
[wezterm config]:
  https://git.sr.ht/~timharek/dotfiles/tree/main/item/.config/wezterm/wezterm.lua
[dotfiles]:
  https://git.sr.ht/~timharek/dotfiles/tree/main/item/.config/wezterm/wezterm.lua
[uses]: /uses
