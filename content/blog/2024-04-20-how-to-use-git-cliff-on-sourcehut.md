+++
title = "How to use git-cliff on SourceHut"
description = "Automatic changelog generation on SourceHut builds."
tags = ["CI/CD", "SourceHut"]
+++

I have been using [git-cliff] to generate my CHANGELOGs since I heard about it
January last year, but I have been using it manually. Meaning I have been
running `git cliff -o CHANGELOG.md` on my local machine and then pushing it. But
now I have found a way to do it automatically with [SourceHut builds].

If you just want to check out the source for this, please see
[srht-git-cliff-example].

## How to get started

1. Generate a new SSH-key for SourceHut builds:
   `ssh-keygen -t ed25519 -C "builds.sr.ht" -f ~/.ssh/builds-srht`
1. Add the newly generated public key to your
   [SourceHut account](https://meta.sr.ht/keys).
1. Add the private key as a secret to your
   [Sourcehut Builds](https://builds.sr.ht/secrets).
1. Copy the example from [`example.build.yml`] to your project and replace
   `secrets` and `environment`, and other steps as you see fit.

You should end up with something like this:

```yaml
image: alpine/edge
packages:
  - git-cliff
secrets:
  - <your-builds.sr.ht-secret>
sources:
  - git://git@git.sr.ht:~<username>/<repo-name>
environment:
  dir: <repo-name>
  source: <your-source>
tasks:
  - check: |
      cd $dir
      if ! [ "$(git describe --exact-match --tags HEAD)" ]; then \
        complete-build; \
      fi
  - update_changelog: |
      cd $dir
      git cliff -o CHANGELOG.md
  - set_srht_defaults: |
      cd $dir
      ssh-keyscan -t rsa git.sr.ht >> ~/.ssh/known_hosts
      git remote set-url origin $source
  - push_changelog: |
      cd $dir
      git checkout main
      git add CHANGELOG.md
      git commit -m "chore(release): Update CHANGELOG"
      git push -o skip-ci
```

Then the next time you tag a commit, `git tag v1.0.0` and do a
`git push origin v1.0.0`, [git-cliff] will automatically update your
`CHANGELOG.md`.

## Pro-tip

Don't waste [SourceHut builds]-time by doing
`git push && git push origin v1.0.0`. Do
`git push -o skip-ci && git push origin v1.0.0` instead.

[git-cliff]: https://git-cliff.org/
[SourceHut builds]: https://builds.sr.ht/
[srht-git-cliff-example]: https://git.sr.ht/~timharek/srht-git-cliff-example
[`example.build.yml`]:
  https://git.sr.ht/~timharek/srht-git-cliff-example/tree/main/item/example.build.yml
