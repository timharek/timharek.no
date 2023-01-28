+++
title = "How to run Deno on Sourcehut"
description = "How to run Deno on Sourcehut (sr.ht) with their build system."
[taxonomies]
tags = ["100 days to offload", "DevOps"]
+++

I've been writing some scripts for this website for handling my [logs][logs] and
I made some tests, because tests are cool.

It might not be straight forward [installing Deno][deno] on Linux, and I tried
different solutions before I ended up with this. I wanted a `.build.yml`-file to
be as small and readable as possible.

Here is what you need for your [`.build.yml`][build-srht]:

```yml
image: ubuntu/lts
packages:
  - unzip
sources:
  - https://git.sr.ht/~<USERNAME>/<REPO>
tasks:
  - install-deno: |
      curl -fsSL https://deno.land/x/install/install.sh | sh
  - deno-magic: |
      DENO_INSTALL="/home/build/.deno"
      PATH="$DENO_INSTALL/bin:$PATH"
      cd <REPO>
      deno test
      deno task build
```

This method uses the `curl`-installation method on a Ubuntu-system. If you want
to have multiple tasks for running `deno` you need to bring `DENO_INSTALL` and
the new `PATH` for each tasks using `deno`.

[logs]: @/logs/_index.md
[deno]: https://deno.land/manual@v1.30.0/getting_started/installation
[build-srht]: https://man.sr.ht/builds.sr.ht/
