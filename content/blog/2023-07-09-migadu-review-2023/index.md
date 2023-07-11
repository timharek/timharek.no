+++
title = "Migadu review 2023"
description = "After using the service for more than two years."
updated = 2023-07-11
[taxonomies]
tags = ["Email", "Review", "Privacy", "Migadu", "100 days to offload"]
+++

Back in 2020 I came across a [blogpost][dd_post] by Drew Devault about email
service providers. He outlined some good criterias for a good email service
provider. His #1 recommendation was Migadu. Back then I had been a
ProtonMail-user for two years, mostly because I was fed up with how free
alternatives like Gmail was using my email as a marketing machine to advertise
stuff I don't need. But I also liked that it was end-to-end encrypted, albeit I
learned after a while that isn't the case unless both sender and reciever use PM
or PGP.

Anyway, in 2021 I decided to give Migadu a try, and migrate all my stuff over. I
wrote a [review about Migadu][migadu_review] in 2021. And this post/review is
supposed to follow up that and fill out the blanks.

## Why I choose Migadu

There are a few reasons why I choose Migadu, but to summaries it:

- Support open standards: IMAP and SMTP (and POP)
- Unlimited domains
- Catch-all
- Alias email addresses
- API for mailboxes, identities and aliases.

The part I cared most for when I signed up was _unlimited domains_, since I
kept/keep buying new cool domains and I had a bad habit of using multiple
domains for emails. But the main reason I've kept using their services for this
long has been because of open standards, which means I can open my email in any
email app.

Another key thing that sold me on Migadu is their [pros/cons][migadu_proscons]
page. It basically explains their service as a no bullshit service that doesn't
spy on you. More services needs to have page like this.

## What kind of features are there?

First, lets look at their pricing tiers:

- Micro: For sole proprietorships, individuals, freelancers, families.
- Mini: For startups, groups, associations, power users (_the one I use_).
- Standard: For SMEs, power users, associations, NGOs.
- Maxi: For agencies, retailers, large employers, schools.

I bet for most people _Micro_ would be sufficient, but if you plan to send more
than 20 emails per day and you want all of Migadu's features you probably want
to choose _Mini_.

And for the features:

- Standards Email Hosting
- Direct Postmasters' Support
- Have Unlimited Addresses
- No Advertising, No Tracking
- Setup Concierge
- IPv4 + IPv6 Support
- Auto-Responder
- Use any Email Client
- Forwarding
- Built-in DNS
- Continuously Monitored
- Aliasing & More
- SIEVE Filtering (in beta)
- Monitor Activity
- Functional Admin
- Catchalls
- Multi-Admin Access
- Automatic Footers
- API for managing mailboxes, identities and aliases
- Webmail client

There are also more, but they are more specific to support and Migadu as long
lasting company. To see all of their features check out [Migadu's
website][migadu].

Migadu also offers a [student discount][migadu_student] with a valid ID. For
more details you need to contact them.

## What is different with Migadu?

The single thing I would say that makes Migadu different is that focus on
offering unlimited domains instead of a limitation of how many you can have per
pricing tier. And that the only thing they put a limit on is the amount of
traffic you are allowed per day.

They also market themselves as "built and operated 100% on top of open source
technologies" and I know they have an open source project on SourceHut for
[their webmail client][srht_migadu].

## How is the support?

The few times I've had to contact support, they've been excellent! They respond
quickly, and are super helpful. One time I asked them if they could change my
main domain to be one of my domain aliases and they did it within two hours.

But... when there's downtime, I'm not notified during or afterwards. There's no
status-page to tell when their services has been experiencing downtime. And this
happend just a week or two ago. I don't think it lasted longer than one-two
hours. But either way, it's always nice to know that they've handled it properly
and that they are looking into it not happening again.

So do keep that in mind!

## Is it easy to use?

{{ picture(url="content/blog/2023-07-09-migadu-review-2023/migadu-dns.png", alt="Screenshot of Migadu's DNS setup." caption="Migadu's DNS setup.") }}

In my experience it's straight forward to set up and get started. Their guide
for adding a domain has all the details you need to add the different DNS
records and the UI explains what the different things are.

{{ picture(url="content/blog/2023-07-09-migadu-review-2023/migadu-mailbox.png", alt="Screenshot of Migadu's Mailbox overview." caption="Migadu's Mailbox overview.") }}

## Conclusion

You should consider Migadu if you have multiple domains and/or need multiple
addresses (aliases) for a single mailbox. And if you want to get the most out of
your money. Other solutions are often more expensive and have other limitations.

If you have a basic email need there may be cheaper alterantives availble.

[dd_post]:
  https://drewdevault.com/2020/06/19/Mail-service-provider-recommendations.html
[migadu_review]: @/blog/2021-12-12-migadu-review/index.md
[migadu_proscons]: https://www.migadu.com/procon/
[migadu]: https://www.migadu.com/index.html
[srht_migadu]: https://sr.ht/~migadu/alps/
[migadu_student]: https://www.migadu.com/pricing/#do-you-offer-student-discounts
