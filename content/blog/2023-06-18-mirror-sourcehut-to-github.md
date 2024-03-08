+++
title = "How to mirror from SourceHut to GitHub"
description = "And other source forges."
tags = ["Git", "SourceHut", "CI/CD", "DevOps", "100 days to offload"]
+++

Last year I started to use [SourceHut][srht] for all my personal projects and I
also use its [build-system][srht_builds] for [my CI/CD][srht_post]. But I'm not
ready to say goodbye to GitHub yet, we use GitHub at work and stuff like my Deno
modules rely on GitHub. The way I mirrored some of my repos up until now is by
having [multiple push-urls][git_push_urls], but when I go to another computer I
have to remember to setup all of those urls again.

## How to setup a mirror

There aren't that many steps involved, so I'll be breif:

1. Initialize a repository on SourceHut, or use an existsing one.
1. Generate a new SSH-key, example: `ssh-keygen -t ed25519 -C "sourcehut"`
1. Copy the contents of your private key. On macOS:
   `cat ~/.ssh/sourcehut | pbcopy`
1. Go to [builds.sr.ht/secrets][srht_builds_secrets].
1. Add a new secret, give it a name "sourcehut ssh key", paste the private key
   in the secret field and specify that the secret is a "SSH key".
1. Copy the hash of the generated secret.
1. Add a new file to your repository, `.build.yml`.

Within your `.build.yml`, add the following:

```yml
image: alpine/edge
secrets:
  - <your-hashed-secret>
sources:
  - git+ssh://git@git.sr.ht/~<username>/<repo>
tasks:
  - check: |
      cd <repo>
      if [ "$(git rev-parse origin/main)" != "$(git rev-parse HEAD)" ]; then \
        complete-build; \
      fi
  - mirror: |
      cd <repo>
      git remote add github git@github.com:<github_username>/<github_repo>.git
      ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
      git push github main
```

Remember to change:

- `<your-hashed-secret>`
- `<username>`
- `<repo>`
- `<github_username>`
- `<github_repo>`

The `check`-task is there to ensure that we only mirror stuff commited to the
`main`-branch, but this step is entirely optional – so you can remove that task
if you want.

[srht]: https://sourcehut.org
[srht_builds]: https://builds.sr.ht
[srht_post]: /blog/switching-to-sourcehut-builds
[git_push_urls]: /garden/tools/git#multiple-push-urls-for-a-single-remote
[srht_builds_secrets]: https://builds.sr.ht/secrets
