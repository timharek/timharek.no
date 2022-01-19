+++
date = 2021-10-14
updated = 2022-01-19
title = "Deploy a static site to production using git-hooks"
description = """
How to deploy a static site to production (any kind of Linux-server)."""
[taxonomies]
tags = ["git", "DevOps", "tutorial"] 
+++

## Prerequisites

First of all, this post will not teach you how to setup a server nor how to
setup SSH-access to a server.

1. A server with SSH-access.
2. Some prior knowledge about `git`.
3. Nginx, Apache or something equivalent to serve you static site.

## Steps

### 1. Initial setup

On our server we need to create a `bare`-repository which will contain our
project and its hook. It doesn't matter where this repository is located, only
that we have access to it. For this example, we can locate our
`bare`-repositories in a directory called `repos` in our `home`-directory;
`/home/<username>/repos`.

To create a `bare`-repository we run;

```sh
git init --bare <name-of-our-project>.git
```

Now that we have created a `bare`-repository we can go ahead and create a
"deployment"-directory that will contain our built project. Again, it doesn't
matter where it's located, only that we have access to it. For this example we
will deploy a static website, we can locate our "deployment"-directory in
`sites`; `/home/<username>/sites`. Inside of our folder we need to create the
directory that will hold the "built" version of our project.

### 2. Setting up the production remote

In order for this automatic deployment to work, we need to add a new remote to
our working copy of the project. For this example we can do it like this;

```sh
git remote add production <username>@<server>:<path-to-bare-repository>.git
```

In this case the `<username>` will be the username of the user where we've
located our `bare`-repository.

### 3. Creating a git-hook

Back on our server we need to create a `post-receive`-hook in our
`bare`-repository, `<path-to-bare-repository>.git/hooks/post-receive`.

#### Adding the deployment script

In our `post-receive`-hook we write the following;

```sh
#!/bin/bash

BARE_PATH=<path-to-bare-repo>.git
REPO_PATH=<path-to-dest>

cd $REPO_PATH
git --git-dir=$BARE_PATH --work-tree=$REPO_PATH checkout -f main

# Add your build scripts/commands below this line
```

#### Make hook executable

Now we need to make this `post-receive`-hook executable;

```sh
chmod +x <path-to-bare-repository>.git/hooks/post-receive
```

### 4. Symlinking our built site

In order for our site to actually be served online we need to symlink our built
static site from within our `sites`-directory to our "serve"-directory (usually
`/var/www/<site-name>`);

#### Adding symlink

```sh
ln -s <path-to-built-site> <path-to-serve-dir>
```

`<path-to-built-site>` will be within our `sites`-directory, usually in a
directory called `public`.

And now `<path-to-built-site>` will mirror its contents to the
"serve"-directory.

### 5. Pushing to our production remote

Because we now have a `post-receive`-hook on our production server, we can now
just push our local working copy to production;

```sh
git push production
```

And if everything is configured correctly, we shouldn't have any errors. And
voila, we have setup a way to easily deploy to production without any scary
scripts.

## TL;DR

1. Create a `bare`-repository within your home-directory.
1. [Setup a new remote](#2-setting-up-the-production-remote) for production.
1. Create a "sites"-directory to hold the static site.
1. Create a `post-receive` file within the `bare`-repository.
1. Add the [following](#adding-the-deployment-script) to the `post-receive`
   file.
1. Make `post-receive` [executable](#make-hook-executable).
1. [Symlink](#adding-symlink) the built site to the path that is actually
   serving it online.
1. `git push production`.

## UPDATE: 2022-01-19

I recently created a shell-script to create a post-receive git-hook for you,
check it out
[github.com/timharek/git-hooks](https://github.com/timharek/git-hooks).
