+++
title = "I made a website for the place I live"
description = "Why would I do such a thing?"
tags = ["Projects"] 
+++

I live in a condominium (it's called a sameie in Norwegian). The building is not
very big, but it houses 7 apartments and 6 dormitories in a shared loft.

## Previous solution

When I first moved here documents about the building etc. was stored in a
cardboard box and more recent documents were stored in Dropbox. Most of the
digital documents were labeled poorly, which makes it difficult to browse
through to find information fast. I've created a system for all the financial
and organization stuff, which seems to work fine, but it's still inconvenient to
lookup info fast. And I still haven't gotten around to digitalizing the
cardboard box of documents.

Initially all of our communications were through Facebook Groups, which worked
until a thread/post had become stale and someone would just create a new post
and restart a previous discussion. DMs were also common, and there wasn't any
distinction as to where you were supposed to message someone, via Facebook
Messenger, SMS or e-mail.

Throughout our building there were a mix of old and new documents on notice
boards. And most of the stuff on these notice boards got outdated fast, and no
one in our building has a printer (that I'm aware of).

To summarize:

- **Document storage**: Dropbox (and a cardboard box for older docs).
- **Communications**: Facebook groups (Messenger, SMS or e-mail for DMs).
- **Physical documents**: Old and new hanged on notice boards around the
  building.

## New Solution

Storing documents is important, and Dropbox is fine for that, and everyone has
become accustomed to how it works, so I felt like we didn't need to move to a
different provider. The only new thing here is that I'm going in and renaming
files as they are uploaded to make it easier to find them later.

I moved all of communications over to **Slack**. The way we use Slack at work
convinced me that this is the proper way to communicate efficiently. And this
has worked out very well, we loose thread less often, however the new Slack
free-tier is limiting us in terms of searchability, but we are getting by. And
by going over to Slack we haven't eliminated the problem of where to DM someone.
I still get SMS, e-mails and Slack DMs.

And now comes the cool part: For all of the stuff on our notice boards, I made a
website. On our notice boards we kept a list of every resident and owner of the
building and a washing list, where to recycle etc. So I created a super simple
website with Craft CMS with our [craft-starter][starter] from work. I made the
site to have support for announcing upcoming meetings, events, which apartment
and dorm is washing this week (and the upcoming weeks), where to recycle and
much more. I also made a nice overview of everyone in the building, owner or
resident, this page is protected by a password, so that this information stays
out of the public's eyes.

<figure>
  <img
    src="/img/blog/ns6.no-screenshot.png"
    alt="Screenshot of the website I made.">
  <figcaption>
    The super simple website for the building I live in.
  </figcaption>
</figure>

I made the website with a focus on being scaleable, so I've also created more
pages with other details, such as:

- Useful links
- Dugnad (I dunno the English word for this)
- Building expanses that everyone is required to pay
- House rules

I'm planning on creating more pages as I figure out what more is useful to have
on there.

And to fix the issue by having to reprint all of our documents to the notice
boards, I created QR-codes with URLs for the most important webpages. So now we
don't have to reprint every time one of these documents/webpages get updated.

An added benefit of having most of our document creation process on the website
makes it very convenient to announce new meetings, as I can just generate a PDF
of that page/post and attach to the e-mail I send to everyone. Then they'll have
the static copy of the meeting-announcement with a link to the actual post in
case it gets updated.

We've been using this for two weeks now and I've found it super helpful for my
needs. I can even link to stuff on Dropbox whenever I'm referring to a document.
It's also super cheap, I bought a `.no`-domain with a web-hotel on
[Domeneshop][domeneshop] for 350 NOK ($35) a year.

To summarize the new solution:

- **Document storage**: Still Dropbox.
- **Communications**: Slack (with the occasional SMS or e-mail for DMs).
- **Physical documents**: QR-codes (with URLs) hanged around building.
- **Creation of documents**: Via a website made with Craft CMS.

[starter]: https://github.com/netliferesearch/craft-starter/
[domeneshop]: https://domene.shop
