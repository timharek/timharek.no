+++
title = "Refactored the unofficial Fimpolitiet's API"
description = "Last year I made a frontend for Filmpolitiet's reviews, now the code has been refactored..."
[taxonomies]
tags = ["Programming", "Projects", "Deno", "Deno Fresh"]
+++

Last year I made a API frontend for [Filmpolitiet's reviews][fp], simply because
I had the time but I kept wanting to lookup if they had reviewed a movie/show I
wanted to watch or had watch.

## How was the project made?

Using [Deno][deno], [Fresh][fresh] and [PocketBase][pb]. The project is
basically a scraper that provides a simple frontend for all of their reviews in
chronologically ordered with a simple filter.

There was a simple cronjob that runs every hour checking the RSS-feed has
updated. Anyone could initiate the RSS-scraping, but they had to know the URL.

## Drawbacks

Since I had used PocketBase (PB), it meant that I had to go via GUI to update
the database-schema and then update a file in VCS manually. It also meant that I
didn't have any good way of writing database-migrations (I could've if the
[docs][pb_docs] were simpler, _and_ that I knew they existed when I started).

Again, because of PB, I also had to have two seperate processes running on my
server, one for Fresh and one for PB. Fresh was dependent on PB in order to show
data.

Again, again, because of PB, I didn't enjoy the `findFirst`-method the SDK
provided, because it throws an error if it doesn't find anything, which resulted
in me writing a `try-catch` every time.

I also didn't consider storage space when I made the database-schema include
every coverart for each review. Since Filmpolitiet has thousands of reviews the
dataset had accumulated to 9 GB, mostly JPEGs. It's not huge, but it's huge for
what it is for.

Lastly, it wasn't fun to maintain in its current state. There was too many
moving parts when it came to update the codebase.

## What changed

I got rid of PB, it added too much complexity for a project like this. A
coworker said I could probably get away by just using [SQLite][sqlite], and
indeed, it worked like a charm! Thanks, Fredrik!

Because I got rid of PB I introduced classes, which makes it possible for me to
swap SQLite for something else in the future of I need to. The classes made it
very easy to swap out PB because everything was simplified and the business
logic for each entity/class lives one place.

Anyone can't initiate the RSS-scraping anymore, it's protected behind a secret
token now so I can prevent spamming their services.

I don't storage the coverart anymore. I only store and cache their URLs provided
by Filmpolitiet.

Another thing I changed was how to use the API. The JSON-version of the app was
behind `/api/entries` and had duplicate code from the `/entries` route. I
deleted the `/api/entries` and added a check to see if the request was for HTML.
If it's not for HTML, then I return JSON. You can even use the same query params
for filters, and the generated cURL-command is much easier to generate. I also
renamed the endpoint to `/reviews`, since that is actually what it is.

## Conclusion

I have now made it easier for myself to maintain the project, and I believe I
have also made it easier for others to contribute. An added bonus is that since
I use SQLite I have a single file I can take with me anywhere instead of
multiple files that PB provided (and the file is much much smaller, less than 2
MB).

The initial load size when going to `/reviews` page from 36.7 MB to 1.73 MB, and
reduced the initial load time from 3.68 sec down to 700 ms. The search feels
more instant now.

The filesize of the database went from 9 GB down to 2.6 MB.

Running `git diff --stat v0.4.3..v0.6.3` shows
`31 files changed, 1160 insertions(+), 776 deletions(-)`. I may now have more
code, but it's code that I'm in control of.

There are probably some bugs and there are still some issues that need
addressing, but I have a much better starting point now. If you want to help out
or just check out the project you can find it on [SourceHut][fp_project].

And remember to checkout the live version over at
[filmpolitiet.wyd.no][fp_website]! And try to cURL the site as well:
`curl "https://filmpolitiet.wyd.no/reviews"`, you should also try to pipe the
result to [`jq`][jq] and see the results.

[fp]: https://p3.no/filmpolitiet/
[deno]: https://deno.com/
[fresh]: https://fresh.deno.dev/
[pb]: https://pocketbase.io/
[pb_docs]: https://pocketbase.io/docs/js-migrations/
[sqlite]: https://sqlite.org/
[fp_project]: https://sr.ht/~timharek/filmpolitiet-api/
[fp_website]: https://filmpolitiet.wyd.no/
[jq]: https://jqlang.github.io/jq/
