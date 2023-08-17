+++
title = "How to self-host Deno Fresh"
description = "How I self-host Deno Fresh on my own VPS."
[taxonomies]
tags = ["Deno", "Tutorial", "DevOps", "100 days to offload", "Deno Fresh"]
+++

I self-host my own website built with Deno Fresh on my own VPS using systemd and
Caddy. The reason behind this is that I don't want to rely on a third-party
service that I don't have control over and I don't want to use GitHub Actions
when I can use my sourceforge of choice, which is SourceHut.

## Requirements

You need the following to be installed:

1. systemd
   - You can check by running `systemctl --version`.
1. Caddy (useful to have some beginner knowledge on how to use it)
   - [Installation guide][caddy_guide]
1. Deno
   - [Installation guide][deno_guide]
   - or run:
     `curl -fsSL https://deno.land/install.sh | sudo DENO_INSTALL=/usr/local sh`

## Setup

### 1. Set up a systemd service

We want to use systemd so that we have a reliable way of running Deno in a way
that don't require our input. Therefore we need to create a new service, and
that can look like the following:

```systemd
[Unit]
Description=<name-of-service> (Deno Fresh)
Documentation=http://deno.land
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=<user>
EnvironmentFile=<path-to-project>/.env.prod
WorkingDirectory=<path-to-project>
ExecStart="PORT=6969 deno run --no-lock -A <path-to-project>/main.ts"
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

This service-configuration lets us access the network attached to the server,
has a environment file attached, is being run from a specific directory and
restarts on failure.

Remember to replace:

- `<name-of-service>`
- `<user>`
- `<path-to-project>`

Then create the configuration file in
`/etc/systemd/system/<name-of-service>.service`.

You can now enable the service with:

```bash
systemctl enable <name-of-service>.service
```

Note that you don't have to prefix the `ExecStart` with `PORT=6969`, you can
also provide that in the environment file in your project.

### 2. Configure Caddy

In your `Caddyfile` you can add the following:

```caddy
<domain-with-tld> {
	reverse_proxy localhost:6969
}
```

This makes a reverse-proxy on the server, ie. why `localhost` is there, and
points the proxy to the port `6969`.

Replace `<domain-with-tld>` with your actual domain, like `example.org`.

Then run `caddy reload` to reload your `Caddyfile` with your latest changes.

### 3. Start your project

```bash
systemctl start <name-of-service>.service
```

Then you can check if your Deno Fresh project is running with:

```bash
systemctl status <name-of-service>.service
```

And then you can check if your web-project is available on the domain you set up
in your Caddyfile.

## Summary

Now you should be able to run a Deno Fresh on your own server with systemd,
Caddy and Deno installed.

[fresh]: https://fresh.deno.dev
[deno]: https://deno.com
[systemd]: https://en.wikipedia.org/wiki/Systemd
[caddy]: https://caddyserver.com/
[caddy_guide]: https://caddyserver.com/docs/install
[deno_guide]: https://deno.land/manual/getting_started/installation
