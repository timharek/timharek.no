+++
date = 2022-02-07
title = "Owning my own logs"
description = """
Not having someone else own your logs is very nice, especially when you can organize them with "magic".
"""
[taxonomies]
tags = ["Privacy", "IndieWeb"]
+++

I've always been very fond of movies and TV shows, I really like to watch good
entertainment. However, I've never been any good at keeping any logs of what
I've watched and if I enjoyed what I watched, except what I log something in my
[bullet journal](https://en.wikipedia.org/wiki/Bullet_journal) (and keep
forgetting about). One of the reasons behind not keeping a digital log was
because of the hassle to maintain the list and the idea of probably not owning
the log myself. Many moons ago I tried Trakt.tv, and I remember that I spent
hours trying to add as many movies and TV shows as I possibly could, and then
forgetting about its existence.

A couple of months ago I came of Tom MacWright's [blog](https://macwright.com/),
and I was very intrigued by how the website worked. While lurking around I found
an interesting
[blog-post](https://macwright.com/2017/12/11/indieweb-reading.html) about owning
your own reading log. I was then inspired to create something similar for
myself, not only for books but also for movies and TV shows.

## My solution

I believe I've solved it in a different manner than what Tom did, but I think it
suits me better in terms of searchability and categorizations. Since I use
[Zola](https://getzola.org) as my SSG, I can create and maintain multiple
taxonomies for all my movies and TV shows.

For example, I can see all the movies and TV shows that's in the _genre_
[**Action**](/genres/action) or movies with the _director_
[**Jon Watts**](/director/jon-watts/).

It's really cool! The only downside, in my honest opinion, is that I have to
create new Markdown-files for all the entires in order to have taxonomies. I
would much more prefer having everything live in a JSON-file or something
similar, but I do have an easy way to add a review to an entry.

Here you can check out my [watched](/watched)- and [reading](/reading)-logs.
