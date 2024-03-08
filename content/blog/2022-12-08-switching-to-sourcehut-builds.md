+++
title = "Switching to SourceHut Builds"
description = "Earlier this year I started using git-hooks for CI/CD, but now I'm switching to SourceHut."
updated = 2023-06-18
tags = ["Git", "DevOps", "SourceHut", "CI/CD"]
+++

Earlier this year in a post, [What should you choose for deploying your static
websites?][earlier_post], I wrote about what CI/CD[^1] you should chose for your
static websites. And I concluded on using just using git-hooks. Well, by the
title of this post you've probably guessed that I'm indeed changing my mind.

After using this workflow for a while for a few projects I've realized a few
things.

1. I miss having proper version control for the testing, building and deploying
   steps.
1. It requires more effort to setup.
1. I need to manually configure notifications for when something goes wrong.

There are probably more things, but these are the ones that have bothered me the
most. For step #2 I made a shell-script, [git-hooks][git_hooks_repo], so that I
don't have to remember every intricate detail each the time.

So why [SourceHut][sourcehut]? [Last time][earlier_post] I wrote about this
topic I found out their tool is the easiest to configure and use in my opinion.
They have support for hosting of static sites, and you also have access to a
bunch of packages for the [different images][srht_images] they provide. Ben
Busby's blogpost, [GitHub vs GitLab vs SourceHut][ben_post], also helped me
switch to SourceHut. A key difference between my git-hooks workflow vs SourceHut
builds is speed, my git-hooks workflow took a few seconds, but with SourceHut it
takes up to 1 minute. But I'm in no rush.

As of writing I've moved my personal website over to SourceHut's build-system,
and I've moved the website for the place I live ([my post about
it][place_i_live]) to it as well. This project didn't even use git-hooks, it
used GitHub Actions. My plan is to move [Everyday Privacy][everyday_privacy]
over, which is using Vercel today. I also want to start adding more tests and
checks to my other small projects, so that I can get notified if something
doesn't pass after I've pushed to remote.

I'm looking forward to using SourceHut more, I like how simple it is. It takes
away a lot of unnecessary bits that other source-forges has.

[^1]: Short for: Continuous Integration / Continuous Deployment

[earlier_post]: /blog/what-should-you-choose-for-deployment
[git_hooks_repo]: https://github.com/timharek/git-hooks
[sourcehut]: https://sourcehut.org
[srht_images]: https://man.sr.ht/builds.sr.ht/compatibility.md
[place_i_live]: /blog/i-made-a-website-for-the-place-i-live/index
[everyday_privacy]: https://everyday-privacy.com
[ben_post]: https://benbusby.com/gh-vs-gl-vs-sh/
