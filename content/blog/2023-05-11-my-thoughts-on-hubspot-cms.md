+++
title = "My thoughts on HubSpot CMS"
description = "What I've been up to since December."
tags = ["100 days to offload", "Thoughts", "CMS"]
+++

At work I'm very fortunate to be able to try new stuff and be asked to try new
stuff. And something I had to learn about recently was HubSpot (HS), more
specifically their CMS.

In this blogpost I will talk about what my thoughts on the whole CMS is from a
developer's point of view.

## What is HubSpot?

Well, you could describe it as a _corporate_ tool for marketers for inbound
marketing. The reason I call it _corporate_ is because it's not really made with
editors and everyday people.

## My thoughts start here

Alright, lets get started.

### How to setup a project

The first step is clunky. There is no way to create a local development
environment, you have to work in their cloud. So their recommended first step
for a developer creating a new website is to create a _developer sandbox_
account. OK, fair enough. And to make things simple they have a [boilerplate
starter][boilerplate] on GitHub.

After cloning the boilerplate you need to install their CLI in order to work
with your newly created _developer sandbox_. And after you've connected you have
to use the CLI again to actively watch your local filesystem for changes so that
they can be "streamed" (one-way) to your sandbox.

How do you do version control? Well, you have to have seperate accounts for
production and staging, and then you can use proper
<abbr title="Version Control System">VCS</abbr>. So remember the boilerplate I
mentioned earlier? It has a GitHub Actions workflow that lets you deploy changes
to your cloud environments.

To me this feels cumbersome, it might be because I'm so used to Craft CMS, but
nonetheless I want to be able to have all my stuff offline so I don't have to
rely on anything other than my computer.

[boilerplate]: https://github.com/HubSpot/cms-theme-boilerplate

### Templating

HS has its own templating language called [HubL][hubl]. It's very similiar to
other templating languages like [Twig][twig], [Liquid][liquid], [Tera][tera]
etc. But it has its quirks 😅

One thing I haven't seen in any of the other languages is the ability to apply
the templating to CSS-files to make them dynamic. I've always looked at that as
design decision so that you don't overcomplicate your code ([example from
HubL][hubl_example]).

For the most part it's OK, but the documentation is confusing at times. I
remember when I nedded to filter specific values from an array. I tried to find
a `filter`-filter, but none where to be found. But after a bit of time I
discovered two filters: `rejectattr` and `selectattr`. Not a big deal, but it
was not expected to find two entirely different named filters for such a common
thing to do.

I would really like for docs to learn from Twig's docs about how to structure
and name everything.

[hubl]: https://developers.hubspot.com/docs/cms/hubl
[twig]: https://twig.symfony.com/
[liquid]: https://shopify.github.io/liquid/
[tera]: https://tera.netlify.app/docs/
[hubl_example]:
  https://github.com/HubSpot/cms-theme-boilerplate/blob/main/src/css/theme-overrides.css

### Serverless functions

This was an adventure. First there's no mention in their [official
docs][serverless_docs] for running the functions locally. So after running the
functions online in their cloud for a few days I found it by randomly checking
their CLI with `hs --help`.

[serverless_docs]:
  https://developers.hubspot.com/docs/cms/data/serverless-functions

#### Outdated Node

Back in November 2022 when I started working on the functions the latest version
of Node available was `v14.x`, which had its
<abbr title="End of Life">EOL</abbr> on 30th of April 2023. I can now confirm
that they have upgraded to `v18.x`.

#### Pre-installed packages

As of today, May 11th 2023, there are currently four pre-installed packages that
are available:

- @hubspot/api-client: `^1.0.0-beta`
- axios: `^0.19.2`
- request: `^2.88.0`
- requests: `^0.2.2`

Even their own first-party package isn't updated, the latest version is `v8.9.0`
as of May 11th 2023. All the other packages are also super outdated, and
"request" has been depreacted since February 11th 2020.

Since their own package is outdated I have to use their own REST-API when
working with data coming from the CMS.

I don't think I need to say anything else.

#### Shared code

There is no offical way to share code between different functions other than a
officially recommended [community post][hs_split] about using Webpack. However,
it's entirely possible to have shared code when running the functions locally
🤷.

[hs_split]:
  https://community.hubspot.com/t5/APIs-Integrations/Import-packages-in-serverless-functions/m-p/346620

#### Secrets / Environment variables

You have to either store the secrets in the `serverless.json`-file or use their
CLI to add secrets to you cloud accounts. Be sure to remember to switch accounts
using their CLI to update the correct account's secrets.

Also, when you're working locally you can use dotenv, but the functions ignore
comments like `#VAR_NAME="secret"`. It's still available with
`process.env.VAR_NAME`.

One really cool thing is that you can use diffent dotenv-files with the CLI when
running the functions locally with `hs functions -c`, and this commands actually
checks if the dotenv-file is ignored by git which can come in super handy if
you're not careful.

#### Logs

You're limited to 4 kB logs unless you run stuff locally, then you can see
everything. And 4 kB may sound like a bit, but it really isn't - it's basically
for writing `SUCESS` and `ERROR`.

## Conclusion

Not sure if there's anything to conclude, I'm not very impressed with HS after
working with it for a longer period of time. I haven't even talked about the
editors UI for creating pages etc. I might also have forgotten a couple of
things, but this post is mostly for reference and in case some people stumple
apon it thinking about trying out HubSpot CMS.
