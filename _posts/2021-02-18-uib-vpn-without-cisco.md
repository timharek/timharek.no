---
layout: post
date: 2021-02-18 
title: How to connect to UiB VPN without Cisco AnyConnect 
excerpt: Tutorial on how to setup OpenConnect to connect to UiB's new VPN 
author: Tim Hårek
tags: tutorial, vpn
---
If you are a student at the University of Bergen (UiB), you might have discovered that UiB now uses Cisco AnyConnect instead of their own, self-hosted alternative like before. Personally, I find the Cisco AnyConnect app to be very privacy invading, demaing all these different privileges... so I started looking for alternatives. Luckily, I found an open-source alternative, [OpenConnect](https://gitlab.com/openconnect/openconnect).

## Step 1: Installation
Firstly, you need to install _OpenConnect_.
<details>
    <summary>Linux</summary>
    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>sudo apt update
sudo apt install openconnect
</code></pre></div></div>
</details>
<details>
    <summary>macOS</summary>
    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>brew install openconnect
</code></pre></div></div>
</details>

## Step 2: Getting your VPN certificate
1. Login on [vpn3.uib.no](https://vpn3.uib.no), with your UiB credentials (_abc001_)
2. Right-click anywhere and click `Show page info`
3. There should be a "tab" named `Security`, click that
4. Click `Show Certificate`
5. In Firefox, under Miscellaneous,  you should be able to find a section that says "Download", choose `PEM (cert)` and save it to your downloads folder (`~/Downloads`)

## Step 3: Setting up the certificate
Now that you have managed to retrieve your VPN certificate, you need to setup the certificate so that you will be able to use it.

I created a folder in my home directory (`~/`) called `.cert`, so that it is hidden whenever I navigate my files via the File Explorer/Browser.

You can also do that, just do the following:
```sh
cd ~/
mkdir .cert
mv Downloads/vpn3-uib-no.pem .cert/
```

Now the certificate is ready to be used when we connect with _OpenConnect_

## Step 4: Creating an `alias` (shortcut)
To save yourself from writing a long command everytime you need to use the VPN, we can create an alias.

This will depend of which shell you are using, I am using [ZSH](https://www.zsh.org/), but the steps are similar for [BASH](https://tiswww.case.edu/php/chet/bash/bashtop.html) as well.

1. `nano ~/.zshrc` 
    - `.bashrc` if you are using BASH
2. Paste this at the end of the file, and change the username: 
    - `alias vpn="sudo openconnect --user=abc001 --cafile=/Users/$USER/.cert/vpn3-uib-no.pem vpn3.uib.no"`
3. To save and exit out of `nano`, press <kbd>CTRL</kbd>+<kbd>X</kbd> and then <kbd>Y</kbd> (for yes) and then <kbd>Enter</kbd> to write the changes.
4. Run `source .zshrc`

You should now be able to run the command `vpn` to connect to UiB VPN.

## Step 5: How to use
1. Run `vpn`
2. Input your computer-password
3. Input your UiB password
4. (Optional) Input your Microsoft 2FA code
5. Sucess!

## Disconnecting
Press <kbd>CTRL</kbd>+<kbd>C</kbd>

## Suggestions and/or questions
If you have any questions, please feel free to [contact](/contact) me!
