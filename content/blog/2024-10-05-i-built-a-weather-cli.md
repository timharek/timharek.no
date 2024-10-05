+++
title = "I built a weather CLI"
description = "Using Go and Yr/Met.no."
tags = ["Tools", "Terminal", "Go"]
+++

The last two weeks I have been learning Go and I thought it would be a great
opportunity to remake an app and API I have made many iterations of over the
years. I had never tried to make the weather CLI using anything other than
JavaScript/TypeScript before.

The API I used to get the weather data is from [Meteorologisk institutt] (Met),
they provide an excellent and free [API for getting location forecast] for a
specific coordinate. And since I don't want to type coordinates every time I
want to check the weather, I'm also using [Nominatim] for resolving location
names to coordinates.

My [previous project] written in TypeScript (TS) also used Met and Nominatim, so
I gave myself another challenge, to cache the results locally. It was my first
time using the operating system's temporary directory, and that is thanks to
Go's excellent standard-library: `os.TempDir()`.

Compared to my previous project, the new codebase is bigger. Just in terms of
lines of code (LOC) the difference is 678 LOC in TS and 1116 LOC in Go.
Although, the new CLI does more. And in TS I hardly handle any errors other than
input errors and if Met's API fails for some reason. In Go you are guided much
more to handle errors, it's not like in JS/TS where you have to catch
everything.

I compile binaries for all the major platforms so people can install the CLI
without Go. My end goal here is to get the CLI published to a few package
managers.

You can checkout the project on [SourceHut][yr], I'm open for feedback and
contributions!

If you just want to download the CLI:

```bash
go install git.sr.ht/~timharek/yr
```

Now you can run:

```bash
yr now "new york"
```

And if you want to compare the result with what is online, you can use `--web`:

```bash
yr now "new york" --web
```

Or check tomorrow's forecast:

```bash
yr tomorrow "new york"
```

You can even pipe the output to tools like `jq`:

```bash
yr now "new york" --json | jq
```

This was a lot of fun to make, and I hope someone finds it useful! I'm looking
forward to my next Go-adventure!

[Meteorologisk institutt]: https://www.met.no/
[API for getting location forecast]:
  https://api.met.no/weatherapi/locationforecast/2.0/documentation
[Nominatim]: https://nominatim.org/
[previous project]: https://jsr.io/@timharek/d-yr
[yr]: https://sr.ht/~timharek/yr
