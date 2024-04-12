+++
title = "I switched from Wireguard to headscale"
description = "On why I switched from using just Wireguard to a self-hosted headscale (tailscale-server)."
updatedAt = 2024-04-13
tags = ["Thoughts", "VPN", "Software", "Homelab"]
+++

I've been using [Wireguard] as my home VPN for about three years and I hadn't
had much to complain about after the initial setup. But over the last year I've
heard more and more about [Tailscale] and how great it is, easy to use and that
it's built ontop of the Wireguard-protocol.

I've always thought that Tailscale looks great and having so many good reviews
and endorsements must mean that this is indeed a great service. But having to
use a third-party identity provider kept me from trying it. I don't want to have
to rely on a third-party for another service to function, I get from a business
standpoint and also a security standpoint. They have even written about it on
their [SSO provider docs][tailscale-sso]. However, they do provide an option for
[Custom OpenID Connect (OIDC) providers], but I'm not familiar with how that
works (and I didn't try it before I went with `headscale`).

But then I heard about an open source implentation of the Tailscale-server,
[headscale]. I can't remember where I heard about it, could have been from the
[Linux Unplugged]-podcast, [Self-hosted][sh]-podcast or somewhere else. I
bookmarked it and wrote it down as a future todo to check it out. Six months
later I decieded to try it out. And now I have no open inbound-ports on my home
network and I can access all my servers from my own [tailnet][tailnet] (or
headnet?).

I initially went into the whole thing expecting it to take me hours to get
everything up and running, and within 30 minutes I had closed all my inbound
ports. I don't have a complicated setup and I already knew how stuff worked with
Tailscale. But I felt like understood much more of what I was doing when setting
up [headscale] in comparison to when I set up Wireguard for the first time.

## What I did

I have a few computers in my homelab (see my [uses]-page for more details):

- Intel NUC
- couple of Raspberry Pi's, PiHole and Home Assistant
- decommissioned ThinkCentre
- VPS on Iceland at [1984-hosting][1984]
- laptop
- phone

I used my VPS as the headscale control server, this way I don't have to have any
domain or service point to my actual home IP address and I don't have to have
any inbound ports open. And I installed the official Tailscale client on all my
devices listed above, I didn't install the CLI on my phone, but I did do it for
all the other systems. On my laptop I have both the desktop client and the CLI
client. I also set up the Tailscale CLI on my VPS, I'll tell you why later.

I first connect/login to my control server via the Tailscale client on my
laptop, and then verify the client on the control server. Then I repeat the
steps for all the different machines.

Then I marked my Intel NUC and my VPS as [exit-nodes][exit-node], and this is
why I installed the Tailscale CLI on my VPS. Now I'm able to use my phone or
laptop like I'm at home or on Iceland.

And now that I have everything setup, I can use [Caddy][caddy] as a
[reverse-proxy][reverse-proxy] on the VPS. I self-host [Jellyfin][jellyfin] for
some of my home-media and now I can expose that service to the internet using
this set up. And this is where I think the setup really shines: I already have
the service running fine on my Intel NUC, and since headscale supports
[MagicDNS][magicdns] my `Caddyfile` is as simple as this:

```caddyfile
jellyfin.example.org {
	reverse_proxy nuc:8096
	log {
		output file /var/log/caddy/jellyfin.example.org.log
	}
}
```

And I have used this as a template for more services that I self-host and
manage.

Note: When I access my Jellyfin-instance via `jellyfin.example.org`, data has to
travel back and forth using the VPS as an intermediate. With the
Tailscale-service you can use their [`tailscale funnel` command].

Disclaimer: I haven't tried to set it up for multiple, yet. It's something I'm
going to look into so that my <abbr title="significant other">SO</abbr> also can
check and update Home Assistant.

I highly recommend checking out [headscale] if you:

- are thinking about trying out Tailscale but don't want to use their identity
  providers or just want a simple set up that you control,
- don't want any open ports on your home network,
- or need a personal VPN.

What are you using for your homelab?

## Update: 2024-04-13

Added more details about OIDC for Tailscale, and a note for using a VPS as a way
to not having to have open ports on your home network. Thanks you, [Jan-Lukas
Else] for telling me about it! :)

[Wireguard]: https://www.wireguard.com/
[Tailscale]: https://tailscale.com
[headscale]: https://github.com/juanfont/headscale
[tailscale-sso]:
  https://tailscale.com/kb/1013/sso-providers#signing-up-with-an-email-address
[Custom OpenID Connect (OIDC) providers]:
  https://tailscale.com/kb/1240/sso-custom-oidc
[Linux Unplugged]: https://linuxunplugged.com/
[sh]: https://selfhosted.show/
[tailnet]: https://tailscale.com/kb/1136/tailnet
[uses]: /uses#homelab
[1984]: https://1984.hosting/
[exit-node]: https://tailscale.com/kb/1103/exit-nodes
[caddy]: https://caddyserver.com/
[reverse-proxy]: https://en.wikipedia.org/wiki/Reverse_proxy
[magicdns]: https://tailscale.com/kb/1081/magicdns
[jellyfin]: https://jellyfin.org/
[Jan-Lukas Else]: https://jlelse.blog/
[`tailscale funnel` command]: https://tailscale.com/kb/1311/tailscale-funnel
