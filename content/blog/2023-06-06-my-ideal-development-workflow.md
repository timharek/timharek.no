+++
title = "My ideal development workflow"
description = "How I like to work in order to get things done."
[taxonomies]
tags = ["100 days to offload", "Thoughts", "Git", "DevOps"]
+++

This year I've started a few project both during my spare-time, but also at
work. At work I've been very fortunate to be the tech-lead for the projects I've
been assigned to where I get to try new things and find an optimal workflow that
works for both my co-workers and myself.

## 1. Foundation

I like to start with setting up a new project using git, at work we use GitHub
so I usually create a new directory locally and run `git init` and use
`gh repo create <project-name>`, and if it's a personal project I usually host
it on SourceHut. Then I start by setting up the neccessary tools that we're
going to use for the project, this varies on a project-basis.

After all the boilerplate is setup I like to use my time to write up a proper
`README.md` so that my co-workers and I know what this project is about and how
to get up and running.

## 2. Automating deployment

I don't like to deploy manually, it's fairly error-prone and it's easy to forget
a step or two. So I try to automate this as much as I can, here my tooling
varies based on the project, but I mostly use [SourceHut builds][srht_builds],
[Buddy.works][buddy] and [GitHub Actions][gh_actions]. But in order to automate
the deployment-process I like to write down everything that needs to happen,
this I do in a simple Markdown-file with some code blocks with comments for
myself. And I use this file to see if there are any steps that I can remove, do
earlier or later, and see if there are some stuff that needs explaining.

## 3. Workflow

When I work on my personal projects I barely use PR/patches since I'm the only
contributor, but at work I make PRs all the time. And we like practise [trunk
based-development][trunk], which means we use short-lived feature-branches made
by a single person. I use feature-branches for myself as well so that I can have
a clear log of every change and merge.

And here it's good to have a up-to-date changelog, ideally after each
feature-branch I will update the changelog to describe what I've changed. Here
it's useful to practise good commit hygiene, I like to use [conventional
commits][con_commits] so that I know wheter a commit was a new feature, bugfix
etc. That makes it easier for me to write and keep the changelog up-to-date.

## 4. Actual deployment

So how do I deploy to production and a staging environment? Using tagged commits
with [semver][semver] and pushes to the main branch. For production for example
pushing a commit that has been tagged with `git tag` would result in push to
producion. And for staging it would simply be pushing and/or updating the main
branch on the remote host. By using semver it makes it easier to see in the git
history when and where changes have been deployed, and it could also tell your
co-workers or end-users what version they're currently using.

And to make tagging more useful I use the `-a`-flag so that I can add additional
notes to the tag. And here I like to copy-paste the changelog for the current
version.

## 5. Maintain the README

During development it isn't unlikely that something in the workflow, setup etc.
will change, so it's important to update the README regularly in order to save
time and frustrations. I like to add notes like **"Things to know"**, why did I
end up using this package or plugin, why is the project structured the way it
is. And always try to write as precise as possible, if something needs a lot of
explaination maybe something has to change elsewhere?

## Final thoughts

This is my ideal workflow as of now, don't arrest me if I make any changes or
stray away from this workflow in the future 😅 I'm always trying to optimize my
workflow and find better ways to work with others and make everything as smooth
as possible.

[srht_builds]: https://builds.sr.ht
[buddy]: https://buddy.works
[gh_actions]: https://github.com/features/actions
[trunk]: https://trunkbaseddevelopment.com/
[con_commits]: https://www.conventionalcommits.org/en/v1.0.0/
[semver]: https://semver.org
