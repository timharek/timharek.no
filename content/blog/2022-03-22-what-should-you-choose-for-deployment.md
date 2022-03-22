+++
date = 2022-03-22
title = "What should you choose for depolying your static websites?"
description = """
Should you use GitHub Pages/Actions, `scp/rsync`, Sourcehut, GitLab?
"""
[taxonomies]
tags = ["DevOps", "Git"]
+++

For the last couple of weeks I've been asking myself this. What is the better
solution? Do I want to rely on a third-party for the deployment of my static
sites, if so, which ones? If no, should I use [git-hooks][git_hooks],
`scp/rsync` or just plain old FTP?

Today I use git-hooks for my deployments for my static sites, and I push to my
own server using [multiple push-urls][git_pushurls]. I store a
`post-receive`-template in my Ansible configuration for my servers, and I
recently added a Pushover-webhook for notifications for success and error
messages.

First of all, I think it's important to go through all of the alternatives I've
listed above (except FTP).

## [GitHub][github] - Pages and Actions

If you're a developer, you most likely have a GitHub-account. We do know that
they have good reputation[^1], a decent platform that is reliable that a lot of
big name companies use. GitHub has a
[freemium pricing model](https://github.com/pricing), which is quite generous
when it comes to GitHub Actions.

If we were to consider using GitHub for deploying our static website, we have
two options;

1. GitHub Pages
2. GitHub Actions (deployment to our own server)

And both of these alternatives are free.

### GitHub Pages

If you want to deploy a simple [Jekyll][jekyll] website, all you need to do is
enable GitHub Pages in your repository settings and voila, you've deployed your
site[^2].

### GitHub Actions

With GitHub Actions you get more options, you can deploy to GitHub Pages with
almost any <abbr title="Static-Site Generator">SSG</abbr> or you can use the
same workflow to deploy to your own server. Each run of the GitHub Actions is
initiated when you push to your remote repository (depending on how you've setup
the rules etc.).

## [Sourcehut][sourcehut]

Sourcehut is an open source ([paid][srht_pricing]) alternative to GitHub/source
forges.

Similarly to GitHub Actions, you can deploy your code to Sourcehut Pages
provided by [Sourcehut][sourcehut_ci] themselves, but you can also deploy to
your own servers using their build-system.

## [GitLab][gitlab]

GitLab is an open source freemium alternative to GitHub/source forges.

Similar to Sourcehut and GitHub Actions, you can either choose to deploy to
their GitLab Pages or to your own server through their [CI/CD][gitlab_ci]
pipelines.

## Git-hooks

I've mentioned git-hooks before on this blog ([here][git_hooks_post1]), and they
can be quite powerful! However, they can be a bit of a pain to setup and debug,
depending on how you've set them up.

But you can picture a scenario where you have a local repository with either two
remotes or one remote with [multiple push-urls][git_pushurls] and you push your
local changes to both your Git-provider (ie. GitHub) and your deployment server.
When your server receives the changes a `post-receive`-hook is initiated and
through some shell-scripting your site deploys (you can make it as complicated
as you want)!

## `scp/rsync`

Just to get it out of the way, I would argue that `rsync` is the better option
than `scp`, because you don't need to transfer files unnecessary that hasn't
been altered between each build.

With `rsync` you'd deploy your changes to your own server from your local
repository.

## So what's the best solution?

Lets compare third-party services and "local"/self-hosted alternatives
separately.

### Third-party

- GitHub Pages is super simple when using Jekyll, but can be more "challenging"
  when using a different SSG.
- Sourcehut Pages and GitLab Pages you must use their `.yml`-files for CI/CD,
  and requires some setup.
- For deploying on your own server, Sourcehut and GitLab uses the same
  `.yml`-file as for their Pages setup, this is also true for GitHub Actions.
- In order to use different packages, like `rsync` etc., the setup for Sourcehut
  and GitLab is pretty straightforward, you define the required packages before
  the inital "script". But for GitHub Actions you may need to run the basic
  `apt-get` to install something, or checkout their Marketplace.
- Sourcehut provides a good selection of [images/OSes][srht_os] to choose from,
  in comparison to [GitHub][github_os].
- Storing secrets are very similar between all three services.
- You store the deployment-scripts in the repository itself (except for GitHub
  Pages). (You should also document it)
- Doesn't run on your machine locally.
- Can give helpful and not helpful errors.
- Can provide clear status indications if something was a success or and error.
- Can do automatic tests on your code.

### "Local"/Self-hosted solutions

- It can be very fast, especially when compared to the third-party solutions.
- Git-hooks; it requires the understanding of what a bare-repository is.
- You can easily mess up and delete stuff when using `rsync` both for git-hooks
  and doing it directly from your local machine.
- Can be difficult to debug.
- Git-hooks; You need to either remember what remote-url the `post-receive`-hook
  is on or document it somewhere.
- Doesn't give much of an indication if something was a success or not, it's
  pretty much up to yourself to create good and clear messages.
- Can do automatic tests on your code, but you'll need to do some configuration
  for errors, notifications and halts in the steps.

## Conclusion (?)

I haven't gone into depth for most of the solutions, but I think I managed to
mention the most important parts, and what's similar and different between them.

There isn't really a correct answer to my initial question, it's very much up to
you for what you decide what's best for you. And I'm still on the fence.

I really like Sourcehut's approach, the `yml` is clear to me and I like that the
details lives inside repository itself. But, and there is a big but, will
Sourcehut be around in 2 years, 5 years? I dunno. It also costs money, or at
least it will be doing so when it leaves alpha. But I would happily pay a
monthly/yearly fee if I knew that the service would be around in 5 years. And I
also need to (don't have to) push to multiple remotes, and I need to either
remember all of them or document it somewhere.

As for now, I think I will stick to my self-hosted solution using git-hooks
using Pushover for notifications.

I'm open for suggestions and tips you have any, please don't hesitate to reach
out [tim@harek.dev](mailto:tim@harek.dev) ([public key](/key)).

[^1]: Subjective opinion, because of their massive user base.

[^2]: There are a few more options if you want to have custom domain etc.

[jekyll]: https://jekyllrb.com
[github]: https://github.com
[github_os]:
  https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#choosing-github-hosted-runners
[git_hooks]: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
[git_hooks_post1]: /blog/deploy-with-git/
[git_pushurls]: /blog/git-tips-and-tricks/#pushing-to-multiple-remotes
[sourcehut]: https://sourcehut.org
[sourcehut_ci]: https://man.sr.ht/builds.sr.ht/
[srht_os]: https://man.sr.ht/builds.sr.ht/compatibility.md
[srht_pricing]: https://sourcehut.org/pricing/
[gitlab]: https://gitlab.com
[gitlab_ci]: https://docs.gitlab.com/ee/ci/
