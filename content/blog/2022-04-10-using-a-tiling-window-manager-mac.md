+++
date = 2022-04-10
title = "Using a tiling window manager on macOS"
description = """
For the last few months I've been using Yabai as a tiling window manager on my MacBook.
"""
[taxonomies]
tags = ["Software", "Tools"]
+++

Before I started working at Netlife I had my own MacBook Pro from when I was a
student, and I had spent a lot of time customizing and tailoring the OS to my
liking. I used both my MBP and a Linux desktop at home, and on my desktop
machine I had installed [i3][i3] because it looked interesting to have my
windows organized automatically.

And on my MBP I couldn't install i3, so I needed to look for alternatives and I
somehow stumbled upon [yabai][yabai]. And when I started working at Netlife I
got a new MBP with an M1 CPU and yabai wasn't compatible anymore. But as of a
month ago, it became compatible again. So I thought I should write about using
it this time, maybe you didn't know there was a tiling window manager for macOS
or have been waiting for someone to write about using it.

## What is a tiling window manager?

It's a window manager, for organizing the window arrangement, that removes the
need to manually arrange your windows. Usually it doesn't have overlapping
windows, it's more common for the windows to stack when they go over each other.
It removes the need to arrange your windows with your cursor.

## Setup process

[Yabai][yabai] has a great wiki with lots of documentation and examples, but the
setup process can be a bit intimidating.

For starters you need to (in order to use it to its full potential) disable
macOS **System Integrity Protection**, which has to be done on the machine while
it's in recovery mode. You also need to give yabai _sudoers_ access, which can
be a security drawback if something malicious were to be added to the project.
But besides all that, it's straight forward installation with Homebrew and a
`touch` of the config-file and you're ready to go!

But you should note that in order to use keyboard shortcuts, you need to install
something that can execute yabai commands, like [skhd][skhd] (made by the same
person as yabai).

Configuring yabai is a breeze, again, their wiki has great documentation with
examples etc.

A quick rundown of what you can configure:

- Layout, floating or managed.
  - Can be specified for specific apps.
- Padding, top, right, bottom and left.
- Window gaps.
- Custom split ratios.
- Mouse support for resizing and moving windows.
- Every setting can be configured to be specific for a specific space.

You can checkout my configurations [here][yabai_config].

## What it's like using

After configuring everything it's very nice to use. But please note, you don't
get any defaults here, you need to configure everything yourself.

When I open a new Firefox window, it automatically opens beside the other one
and splits on an equal 50% with a `20px` gap. And if I close the window again,
or move it to a different monitor the first Firefox window takes full width
again.

And there isn't much more to it actually, I've added a keyboard shortcut to
disable it for specific windows when I haven't added them to the "ignore list".
And I also ignore macOS _System Preferences_ window, because in my experience
those windows don't resize very well, and I usually only have them open to
adjust something quick.

## What are the kinks

There really aren't that many, but I've experienced that something always shifts
and end badly when I share my screen during meetings either via video-meetings
or in a conference room. That can just be bad luck, having to many windows open
or something with a new monitor appearing that breaks something. So I usually
disable it beforehand if I'm going to share my screen.

And like I mentioned above, some windows don't resize well, like some system
popups. But most of them can be fixed by added those apps to the "ignore list"
in your config.

## Do you need a tiling window manager?

The short answer is probably: **No**, you don't. And that's because of what
you've become accustomed to how you've used computers, you are used to moving
windows around and having over them that control with you cursor.

The long answer: **It depends**. Do you enjoy having multiple windows beside
each other? Do you open windows often, do the windows contents matter for the
other windows? Do you spend a lot of time organizing your windows? If all of
these are a resounding _yes_, you should probably check out a tiling window
manager.

[i3]: https://i3wm.org/
[yabai]: https://github.com/koekeishiya/yabai
[skhd]: https://github.com/koekeishiya/skhd
[yabai_config]:
  https://github.com/timharek/dotfiles/blob/main/.config/yabai/yabairc
