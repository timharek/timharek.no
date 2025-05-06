+++
title = 'Docker Context'
description = "I can't believe how I have used Docker on servers without knowing about this." 
tags = ["Docker", "CI/CD", "DevOps"]
+++

A while back I came across [Dreams of Code]'s video about [docker
stack][docker-stack-video]. I mentioned at work that we should definitely check
this out if we decide to not use Google Cloud Platform (GCP) for an upcoming
project.

Well, after a few months a coworker set up a new project on a VPS and used
Docker to get stuff running. He used Dreams of Code's video as a reference for
how to deploy, but quickly discovered that we don't need `docker stack`,
`docker context` is sufficient for our needs.

Enough context, let's dive into how I started using it for my own self-hosting.

The TL;DR for `docker context` is that Docker executes in its set context. Let's
look at project I made and self-host, [bir]. It's a tiny Go application. I want
to have it on my remote virtual private server (VPS). I could transfer the
compiled Go binary to the VPS, or a zipped version of the Docker-image, but that
is cumbersome and error-prone. Here's how I do it instead:

```sh
docker context create "my-vps" --docker "host=ssh://<username>@<vps-host>"
docker context use my-vps
cd bir
docker-compose up -d
```

And now my application is running on my VPS, all without having to manually
transferring files, environment variables etc. Albeit this assumes that you
already have `compose.yaml` (or `docker-compose.yaml`) file and that you have
accessed the VPS at least once before via SSH. And if I want to use my machine
as the context again, I simply change to the default:
`docker context use default`.

I now use this for my home servers and VPS, I haven't come across any issues,
yet.

Please note that when using `docker context` you are using the context's machine
resources, not the machine you are executing `docker-compose` on.

Be sure to checkout the
[official documentation for Docker context](https://docs.docker.com/engine/manage-resources/contexts/).

[Dreams of Code]: https://www.youtube.com/@dreamsofcode
[docker-stack-video]:
  https://www.youtube.com/watch?v=fuZoxuBiL9o&t=313s&pp=ygUOZHJlYW1zIG9mIGNvZGU%3D
[bir]: https://git.sr.ht/~timharek/bir
