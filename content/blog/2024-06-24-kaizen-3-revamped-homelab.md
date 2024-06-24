+++
title = "Kaizen #3: Revamped homelab"
description = "How I revamped my homelab."
draft = true
tags = ["Kaizen", "Homelab"]
+++

I first heard about the [Zimaboard] on the [Self-Hosted-podcast] a while back,
and I bookmarked it for future reference. Then in February I bought one,
the 432. It's been sitting, literally, on my shelf since the day I got it. I
3D-printed a [dual HDD stand] for it and put in two 2.5" drives totaling 6 TB of
storage. And I have finally gotten around to start using it!

## What is Zimaboard?

It's a small form-factor single-board computer, a'la Raspberry Pi, except it's
more powerful and supports the full x86-64 architecture. It's affordable and has
a bunch of ports; dual ethernet, dual USB 3.0, two SATA ports and PCI-Express.

## Previous setup

Before I go over how I have revamped my homelab, let me give you a rundown of my
previous setup.

<figure>
  <img
    src="/img/blog/2024-06-24-kaizen-3-revamped-homelab/old-setup.webp"
    alt="My previous setup. Photo">
  <figcaption>
    My previous setup. Please ignore the mess 😅
  </figcaption>
</figure>

I was using a [Deltaco 9U] server-rack with an Intel NUC i5, a Raspberry Pi
(RPi) and a decommissioned Lenovo ThinkCentre from the university. I used the
NUC for Plex, [Jellyfin], game-servers, [Foundry] etc. I dedicated my RPi to
[PiHole] and finally I used the ThinkCentre for [Nextcloud]. And I kept most of
the machines configurations up-to-date with Ansible.

Initially I just started out with the NUC and RPi, but I wanted to self-host
Nextcloud, which I thought would be difficult when the NUC doesn't have
SATA-connectors. And I had three ThinkCentres lying around. So I bought a new
HDD for the ThinkCentre and installed Ubuntu Server.

After about a year I didn't like that there were multiple cables going
everwhere, it didn't look pretty. So I found a cheap server-rack case from
Deltaco. I bought a few shelves for it and put in my stuff. It still didn't look
pretty on the inside, the ThinkCentre barely fit and all the other stuff was
just laying there. But the server-rack looked nice, so that was a problem
solved.

### Drawbacks

The biggest drawback to this setup has been to maintain it. I have surface-level
knowledge of how to use Ansible, but I still have to SSH onto the servers and do
stuff manually on them anyway. Which I feel defeats the purpose of Ansible. I
think I have been using it wrong.

Another drawback has been that the server-rack takes up so much more space than
it needs. And yes, I know, this is my own doing. I bought the 9U rack because I
thought I would get more stuff, but I have since realized that I don't need that
much.

After moving from a small apartment last year into a house, I have had
difficulties with the networking for this setup. There are no ethernet ports in
the house, and I haven't figured out a good way to add them myself without
tearing down walls or just have them on the floor. I have tried to use
PowerLine, which worked fine until the washing machine was running, because it
was on the same circuit as the router. Then I bought a second router to use as a
mesh-endpoint. That worked much better, but became unreliable over time. And I
got a lot of downtime notifications from [Uptime Kuma].

## Revamped setup

Fast-forward to June I have a fully working server on the Zimaboard running
NixOS with all the different services I want to host.

<figure>
  <img
    src="/img/blog/2024-06-24-kaizen-3-revamped-homelab/zimaboard.webp"
    alt="My Zimaboard setup. Photo">
  <figcaption>
    My Zimaboard setup.
  </figcaption>
</figure>

### How I did it

I started this "project" with a few things in mind:

1. Easy to maintain
1. Small form-factor
1. Easy to move

If you listen to the Self-hosted-podcast, or any Jupiter Broadcasting podcasts,
you have most likely heard all the praise for [NixOS]. The only thing I knew was
that it's an immutable operating system and that the whole OS is configured and
declared using a configuration file in their own languages, called Nix. After
reading Arne's blogpost about [DIY Music Streaming with NixOS, Jellyfin and
Manet], I knew I had to at least try NixOS out.

#### Installation of NixOS

I thought this would be more straight-forward, but I spent a good while checking
the docs and YouTube to see how I was supposed to install NixOS on a server. I
got of to a good start with flashing their minimal OS-version on a USB-stick,
but I was taken a bit back when I felt like I was installing Arch Linux for the
first time. The [docs/manual][nixos-manual] in its whole wasn't numbered with
steps, so when I skimmed through it the first time I thought most of the stuff
was optional, but I figured out fairly quickly that it wasn't optional.

But after checking the manual and YouTube I was up and running after 30 minutes.
And now it was time to learn how to use the thing.

#### Configuring

The whole premise of NixOS is that it's highly declarative, meaning you can
configure the whole OS in a single file. There's no
`apt install <insert-package-name>`, you declare it in the configuration.

The first thing I did was to install [Helix], and all I had to do was declare it
in the config and run `nixos-rebuild switch`:

```nix
{
  environment.systemPackages = with pkgs; [
    helix
  ];
}
```

And then I had to rename it after a legendary server:

```nix
{
   networking.hostName = "anton";
}
```

I was still using the server with its own monitor and keyboard, I had to set up
SSH and that was fairly easy by adding this to the config:

```nix
{
  services.openssh = {
    enable = true;
    ports = [ 22 ];
    settings = {
      PasswordAuthentication = false;
    };
  };
}
```

Now I could unplug the monitor and keyboard, and continue the set up from my
personal machine.

Then I took inspiration from Arne's post from earlier and installed Jellyfin.
And to use Jellyfin I need media, so that's what I tackled next. I found the
drives with `lsblk` like I would normally, and then I mounted them like I would
normally do: `mount /dev/sda1 /mnt/media`. But this wouldn't persist after a
restart, but I can tell NixOS to reconfigure it's hardware-configuration based
on its current state, with `nixos-generate-config`.

Now that I had media in Jellyfin I continued with setting up Nextcloud. The
official NixOS docs has
[instructions for setting it up in the config](https://nixos.org/manual/nixos/stable/index.html#module-services-nextcloud),
so that's what I did. And for getting my data, it wasn't as simple as
["just" mounting a drive](#migrating-from-nextloud-snap-to-bare-metal-on-nixos).

Lastly I installed Docker and `docker-compose`, and that was also very
straight-forward:

```nix
{
  environment.systemPackages = with pkgs; [
    docker-compose
  ];

  virtualisation = {
    docker = {
      enable = true;
      autoPrune = {
        enable = true;
        dates = "weekly";
      };
    };
  };
}
```

Then I created a `docker-compose.yaml`-file and added Foundry as the first
service. And it just worked.

During all of this I was also tracking all the changes with Git. I created a new
repository locally which I just called `config`. I moved both
`configuration.nix` and `hardware-configuration.nix` there and then I made
symbolic links back to `/etc/nixos`:

```bash
sudo ln -s ~/config/configuration.nix /etc/nixos/configuration.nix
sudo ln -s ~/config/hardware-configuration.nix /etc/nixos/hardware-configuration.nix
```

I also moved the `docker-compose.yaml` into the same repo. Now I can track my
changes and push them to a private repo on SourceHut.

#### Migrating from Nextloud snap to "bare metal" on NixOs

This was tricky. I installed the latest version, `29.*` of Nextcloud on my new
server and my old server was `27.*`. And I wasn't going to use the same drive,
therefore I used [Rclone] to sync the old server's data with the new one. It was
about 300 GB and it took a few hours, but everything was transferred. Luckly for
me I was the only one using the server, so I didn't have to use Rclone for any
more users.

## Summary

I know this post is long overdue, but I couldn't write it before I actually took
the time to start the process. I had put it off for a long time, but after
Jellyfin was starting to slow down on bigger files because of my networking
situation I just couldn't take it anymore. And that was the whole point of
buying the Zimaboard as well.

And to actually summarize, I went from two physical machines in a 9U rack to a
tiny machine with two SATA HDDs. I did everything using NixOS and Docker. And
after using it for a few days both my SO and I have noticed big improvements
when it comes to streaming from Jellyfin. I have started to enjoy NixOS more and
more. It's a bit of a learning curve, and I don't know a lot about it, but I'm
learning!

What is your homelab like?

[Zimaboard]: https://www.zimaspace.com/products/single-board-server
[dual hdd stand]:
  https://www.printables.com/model/224057-zimaboard-dual-hdd-stand/
[Self-hosted-podcast]: https://selfhosted.show/
[Deltaco 9U]: https://www.dustinhome.no/product/5011097416/19-5409b
[Jellyfin]: https://jellyfin.org
[Foundry]: https://foundryvtt.com/
[PiHole]: https://pi-hole.net/
[Nextcloud]: https://nextcloud.com/
[NixOS]: https://en.wikipedia.org/wiki/NixOS
[DIY Music Streaming with NixOS, Jellyfin and Manet]:
  https://arne.me/blog/diy-music-streaming-with-nixos-and-jellyfin
[nixos-manual]: https://nixos.org/manual/nixos/stable/
[Uptime Kuma]: https://github.com/louislam/uptime-kuma
[Rclone]: https://rclone.org/
