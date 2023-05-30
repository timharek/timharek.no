+++
title = "Git"
description = "Useful tips I've picked up from Git by using it for a few years. Updates reguarly."
updated = 2023-03-01
template = "layouts/page.html"
[extra]
toc_enable = true
toc_level = 2
+++

[Git][git_scm] is a free and open source distributed version control system
designed to handle everything from small to very large projects with speed and
efficiency.

## Git configuration

The Git configuration-file is usually located in one of these directories:

- `$HOME`
- `/home/<username>/.gitconfig`
- `$XDG_CONFIG_HOME`[^1], `/home/<username>/.config/git/config`

### Initial setup

```sh
$ git config --global user.email user@example.com
$ git config --global user.name "Firstname Lastname"
```

### Multiple configurations

I like to keep my personal and work projects separate, so that I can
differentiate between the two. And I also like to commit and sign my commits
with different email addresses.

In my config I have the following;

```conf
[includeIf "gitdir:<path-to-personal-dir>"]
  path = <path-to-personal-config>
[includeIf "gitdir:<path-to-work-dir>"]
  path = <path-to-work-config>
```

So whenever I'm in my `<path-to-work-dir>` I'm using my work email instead of my
personal email for my commits.

### Aliases

Inside your `gitconfig` you can specify aliases that you can use with the git
command.

An example:

```conf
[alias]
  c = commit
  ca = c -a
```

You can use your aliases within the aliases as well, like I did above.

### Global `.gitignore`

Within your Git configuration add the following section:

```conf
[core]
  excludesfile = <path-to-ignore-file>
```

If you use `$XDG_CONFIG_HOME` path, you can keep the global `.gitignore` within
the same directory, ie. `/home/<username>/.config/git/ignore`.

## Remotes

In order to push your local repository to a remote like GitHub etc., you need to
specify a remote:

```sh
git remote add origin git@<remote-url>.git
```

### Multiple push-urls for a single remote

[Credit][lobsters_thread].

Firstly you need to specify the _original_ remote-url as a **push-url**:

```sh
$ git remote set-url --add --push origin git@original/repo.git
```

And then you can specify the other **push-urls**:

```sh
$ git remote set-url --add --push origin git@original/repo.git
$ git remote set-url --add --push origin git@second/repo.git
$ git remote set-url --add --push origin git@third/repo.git
```

Verify with `git remote`:

```sh
$ git remote
origin git@original/repo.git (fetch)
origin git@original/repo.git (push) # <-- Notice the (push) for each of the lines with the same remote.
origin git@second/repo.git (push)
origin git@third/repo.git (push)
```

And now, when you run `git push` it will push to all three remotes/urls with
just one command.

#### Removing a push-url

```sh
$ git remote set-url --delete <remote> <url>
```

## Commits

### Message

A good commit message can be vital for when new people join your project and
when you need to look back at your history.

Consider a commit message like an e-mail or a letter, it's a message with a
title and body.

The first line of the commit message should be written in present-tense[^2], and
shouldn't contain a period nor exceed 50 characters. Use the first line as a
title to explain what the commit is about. The second line should always be
blank. The third line should contain your message with more descriptions if they
are needed.

Example:

```sh
<title>
# Blank line
<message with actual description about what has been done>
```

The way you would do that is with:

```sh
$ git commit -m '<title>' \
  -m '<message with actual description about what has been done>'
```

### Templates

You can also create commit templates, so that you don't need to remember
everything.

You add this in your configuration like this:

```conf
[commit]
  template = <path-to-commit-template>
```

### GPG signing

You can sign your commits using your GPG key(s).

Specify a GPG-program in your Git configuration:

```conf
[gpg]
  program = gpg
```

And under your `[user]` in the same configuration you need to specify which key
to use:

```conf
[user]
  ...
  signingkey = <fingerprint>
```

In order to commit with your signature you need to use `-s` to add the
`Signed-off-by` and `-S` to get the appropriate GPG-keyid (this is why we added
the fingerprint in the configuration.).

Bonus: Add an alias for always commit with a signature:

```conf
[alias]
  c = commit -s -S
```

And now you can commit with with `git c -m <your-message>`!

## See contributors (with count)

```bash
git shortlog -sne
```

## Tagging

There are multiple ways of tagging:

1. `git tag v1.0.0`
1. `git tag -a v1.0.0`

By using the `-a`-flag you annotate the commit and you're able to use
`git describe --exact-match HEAD` to check if `HEAD` is on the latest tag. This
can be useful for CI/CD.

## Last changed files

Sometimes it can be useful to see which files was last changed.

```sh
git diff --name-only HEAD HEAD~1
```

You can swap out `1` with a hash or another number to go back in history to see
which files has been changed.

## Last commit timetamp

```sh
git log -n1 --pretty="%ct"
```

## Last commit hash

```sh
git log -n1 --pretty="%T"
```

[lobsters_thread]:
  https://lobste.rs/s/dmkw4d/how_back_up_your_git_repositories#c_zfyjqu
[git_scm]: https://git-scm.com/

[^1]: https://wiki.archlinux.org/title/XDG_Base_Directory
[^2]: https://stackoverflow.com/a/3580764
