+++
title = "How to setup soft-serve as a systemd-service"
description = "Setting up and using soft-serve from charm.sh as a Git-server."
updated = 2023-01-15
tags = ["Tutorial", "Git", "Software", "DevOps"]
+++

## What is soft-serve?

From Charm's own git-repo:

> A tasty, self-hostable Git server for the command line🍦"Tutorial", "Git",
> "Software", "Server". ([source][soft_serve])

In other words, it's a text-only based way of viewing your git-repos either
locally or remotely. You could think of it as your own GitHub, but in the
terminal. It's configurable using a single `yaml`-file.

## Prerequisites

1. A UNIX-like system to install `soft-serve` on.
1. (optional) A way of reaching your remote server.

## How to

### 1. Install soft-serve

Depending on your system, checkout their latest
[instructions][soft_serve_instructions] on how to do so on your own system (or
remote server).

### 2. Create a service

On your machine (or server):

1. Navigate to your systemd-directory: `cd /etc/systemd/system`
1. Create a new file: `nano softserved.service`
1. Use this as a template or paste it (remember to verify that you understand
   what this does):

```conf
[Unit]
Description=soft-serve service # Write whatever you'd like
Wants=network.target
After=syslog.target network-online.target # When the network-part of your machine is online and ready

[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=soft # Will get to this in step 3
WorkingDirectory=/home/soft # Can be anywhere (requires $User's access)
ExecStart=/usr/bin/soft # Depends on the system, check yours with `which soft`

[Install]
WantedBy=multi-user.target
```

### 3. Create a user

Run `sudo useradd -m soft`

### 4. Enable service

1. Run `sudo systemctl enable softserved.service`
1. Run `sudo systemctl start softserved.service`

### 5. Access soft-serve

Depending on where you setup your service, you can now access it by running:

```bash
ssh <hostname> -p 23231
```

(If it's a remote machine you might need to open up the port `23231`)

### 6. Follow the official instructions

For the rest of the setup of `soft-serve` I recommend going through their
official instructions in order to configure it correctly.
[Repo-link][soft_serve].

## Update 2023-01-15

As of 2023-01-15 I'm no longer hosting a `soft-serve` server.

[soft_serve]: https://github.com/charmbracelet/soft-serve
[soft_serve_instructions]:
  https://github.com/charmbracelet/soft-serve#installation
