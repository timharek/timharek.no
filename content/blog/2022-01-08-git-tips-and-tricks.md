+++
date = 2022-01-08
updated = 2022-06-19
title = "Git tips & tricks"
description = "Useful tips and tricks I've picked up from using Git for a few years."
[taxonomies]
tags = ["Tutorial", "Git", "Dotfiles"]
+++

## UPDATE: 2022-04-03

I've added a seperate page which I will update whenever I discover something new
about Git in my [digital garden (Git)](@/garden/tools/git.md)

[Git](https://git-scm.com) is an extremely useful tool that I use almost every
day. I'm very thankful that it exists and work as well as it does.

Git comes with ton of commands, and most of us only use a handful of them.

With this short guide I will walk you through my own tips and tricks. There is
probably a lot more to uncover, but this is the tips and tricks I use the most.

## `.gitconfig`

Most of us have probably setup our `.gitconfig` by just using simple commands
like;

```sh
$ git config --global user.email user@example.com
$ git config --global user.name "Firstname Lastname"
```

And this is good and all, but we can do so much more with our configurations!

### Separate configs for different directories

I like to have my personal and work projects separate, so that I can
differentiate between the two. And I also like to commit and sign my commits
with different email addresses.

In my config I have the following;

```conf
[includeIf "gitdir:<path-to-work-dir>"]
  path = <path-to-work-config>
[includeIf "gitdir:<path-to-personal-dir>"]
  path = <path-to-personal-config>
```

So whenever I'm in my `<path-to-work-dir>` I'm using my work email instead of my
personal email for my commits.

### Custom aliases for `git` commands

You can also specify your own aliases within the `.gitconfig`, and this is
useful to save time and optimize your workflow.

An example from my own config;

```conf
[alias]
  c = commit
  ca = c -a
```

You can use your aliases within the aliases as well, like I did above.

I'll show more examples later.

## Pushing to multiple remotes

Up until recently I used an alias for pushing to multiple remotes at the same
time, but I discovered in a
[Lobsters thread](https://lobste.rs/s/dmkw4d/how_back_up_your_git_repositories#c_zfyjqu)
that you can specify more than one remote for the same origin.

```sh
$ git remote set-url --add --push origin git@original/repo.git
$ git remote set-url --add --push origin git@second/repo.git
$ git remote set-url --add --push origin git@third/repo.git
```

And now, if you run `git remote`

```sh
$ git remote
origin git@original/repo.git (fetch)
origin git@original/repo.git (push)
origin git@second/repo.git (push)
origin git@third/repo.git (push)
```

And voila, when you now run `git push` you will push to all three remotes with
just one command!

## Move your `.gitconfig`

It's possible to move your config to the XDG Base Directory (`XDG_CONFIG_HOME`),
which usually is `~/.config`.

You can move your `.gitconfig` there by;

```sh
$ mkdir -p ~/.config/git
$ mv ~/.gitconfig ~/.config/git/config
```

I moved all my configurations there, and have my main `gitconfig` there along
with my personal- and work-configurations. This might be a personal preference
thing, but I like to keep my home directory as small as possible.

## Global `.gitignore`

You can specify your own global `.gitignore` file in case you forget to ignore
some files a project or something.

Within your config;

```conf
[core]
  excludesfile = <path-to-ignore-file>
```

If you've followed the previous tip, you could use the path
`~/.config/git/ignore`.

## Commit messages

Good commit messages are vital for when newcomers join your project and whenever
you need to look back at what you've previously done.

You can think of a commit message like an email or message with a title and
body.

The first line of a commit message should always be written in present-tense,
never contain a period and not exceed 50 characters, the first line is like a
title to what the commit is about. The second line should be blank and the third
line and so on is a more descriptive (can contain details etc.).

An example could be like this (good);

```sh
$ git commit -m 'Add delete function' \
  -m 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
```

And what not to do (bad);

```sh
$ git commit -m 'Added delete function' \
  -m 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
```

## Bonus: Useful aliases

Here is some of my useful aliases that are not that straight forward;

```conf
[alias]
  pnew = !git push --set-upstream origin $(git branch --show-current) # Pushes a newly created branch to the remote(s)

  l = log --all --color --graph --pretty=format:'%Cred%h%Creset %G?%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit # Colorful and easy to read log

  cleanup = "!git branch --merged | grep  -v '\\*\\|main\\|master\\|develop\\|production' | xargs -n 1 git branch -d" # Deletes all merged local branches
  cleanupb = "!git branch -r --merged | grep  -v '\\*\\|main\\|master\\|develop\\|production' | xargs -n 1 git branch -r -d" # Deletes all merged remote branches
```

I hope you learned something new! I want to write more about some of my
configurations from my dotfiles.
