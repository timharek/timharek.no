+++
title = "Introducing git-bump"
description = "I got tired of semver tagging in git, so I made a tool to help me be consistent."
+++

For both my personal and professional projects I use git tag for releasing new
versions. And I like to have `git shortlog <latest tag>..HEAD` as the
body/message of the tag to quickly be able to see what a tag contains regardless
of the source-forge you use (I/we don't want to use GitHub releases at work).

So I created a [`git-bump`] that does exactly what it says, it bumps the
(semver) version. It defaults to patch, but you can pass `--minor` and `--major`
to tell it otherwise.

And if you're like me and sometimes mess up the tag/version, you can do
`git-bump undo`. And even `git-bump undo --remote origin` to easily remove the
tag from your remote.

And because git is awesome, anything that you have your path that is prefixed
with `git-<name>` will automatically be available in git itself. Therefore there
is no need to write `git-bump`, you can simply write `git bump` and it just
works!

I even added the shortlog thing I mentioned, `git bump --shortlog`. Now I don't
need to write a lot nor remember or check which version I'm currently on. I can
simply say that the next version is either a patch, minor or major. When I'm
ready to push, I can do `git bump push`.

You can install it with Homebrew via my tap:

```bash
brew install timharek/tap/git-bump
```

Or using go:

```bash
go install git.sr.ht/~timharek/git-bump/cmd/git-bump@latest
```

[`git-bump`]: https://git.sr.ht/~timharek/git-bump
