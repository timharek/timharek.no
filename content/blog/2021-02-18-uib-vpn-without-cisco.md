+++
title = "How to connect to UiB VPN without Cisco AnyConnect" 
description = """Tutorial on how to setup OpenConnect to connect to
University of Bergen's new VPN."""
updated = 2022-07-07
[taxonomies]
tags = ["Tutorial", "VPN"]
+++

If you are a student at the University of Bergen (UiB), you might have
discovered that UiB now uses Cisco AnyConnect instead of their own, self-hosted
alternative like before. Personally, I find the Cisco AnyConnect app to be very
privacy invading, demaing all these different privileges... so I started looking
for alternatives. Luckily, I found an open-source alternative,
[OpenConnect](https://gitlab.com/openconnect/openconnect).

<aside>
  <p>
    2022-07-07: I've removed steps regarding downloading your own certificate, as I've been told it's no longer neccessary to have.
  </p>
</aside>

## Step 1: Installation

Firstly, you need to install _OpenConnect_.

<details>
  <summary>Linux</summary>

```sh
sudo apt update && sudo apt install openconnect
```

</details>
<details>
  <summary>macOS</summary>

```sh
brew install openconnect
```

</details>
<details>
  <summary>Windows</summary>
    ¯\_(ツ)_/¯

Mabye try to use git-bash or something, I really don't know.

</details>

## Step 2: Creating an `alias` (shortcut)

To save yourself from writing a long command everytime you need to use the VPN,
we can create an alias.

This will depend of which shell you are using, I am using
[ZSH](https://www.zsh.org/), but the steps are similar for
[BASH](https://tiswww.case.edu/php/chet/bash/bashtop.html) as well.

1. `nano ~/.zshrc`
   - `.bashrc` if you are using BASH
2. Paste this at the end of the file, and change the username:
   - `alias vpn="sudo openconnect --user=abc001 vpn3.uib.no"`
3. To save and exit out of `nano`, press <kbd>CTRL</kbd>+<kbd>X</kbd> and then
   <kbd>Y</kbd> (for yes) and then <kbd>Enter</kbd> to write the changes.
4. Run `source .zshrc`

You should now be able to run the command `vpn` to connect to UiB VPN.

## Step 3: How to use

1. Run `vpn`
2. Input your computer-password
3. Input your UiB password
4. (Optional) Input your Microsoft 2FA code
5. Sucess!

## Disconnecting

Press <kbd>CTRL</kbd>+<kbd>C</kbd>

## Suggestions and/or questions

If you have any questions, please feel free to [contact](/contact) me!
