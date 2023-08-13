+++
title = "Migadu > ProtonMail"
updated = 2021-12-12
description = "Why I decided against continuing using ProtonMail and migrate over to Migadu. Not a direct comparison nor a review of the services."
[taxonomies]
tags = ["Email", "Privacy", "ProtonMail", "Migadu"] 
+++

I have been a paying for ProtonMail (PM) since October 2018, where I paid for
the _Professional_ tier with some additional domains. I was very satisfied with
the service I paid for, even though I knew it was more expensive than the
competitors, like Tutanota, Runbox, Gmail, Google Workspace etc.

In the beginning I wasn't really aware of the disadvantages of PM before earlier
this year, because my initial reason to switch from Gmail to PM was because of
privacy. I knew I just had to get away from Google's ecosystem and take back
control over my own data. What I wasn't realizing was that I was slowing
starting to depend on another ecosystem again.

PM is well-known for using end-to-end encryption (E2EE) and zero-knowledge for
storing you data, even when you use their password recovery feature, you cannot
retrieve your emails before the password-reset[^1]. They are also known for
having open sourced (most) of their code, which makes them more likable in the
privacy community, which is one of the reasons I decided to use them as well.

A huge disadvantage with PM is the limitations of your account, even when you
pay. The free account may be more than enough for most people, but for those who
want to be extra safe out there, those who want to use a custom domain, that
will cost you €48/yr. And then you will only be able to send and receive emails
from 5 different addresses on that domain. If you want more, you have to upgrade
your account to _Visionary_ which is €288/yr... In my honest opinion, that's
super expensive and it might not be useful for a lot of people, but I'm sure
some might want to have more than 5 address for their custom domain. You are
also not able to access your emails through the traditional manner like IMAP or
POP, unless you have a paid account and a few minutes to setup their [ProtonMail
Bridge][pm-bridge].

PM has also been pushing their new services, to try to create a new ecosystem,
with ProtonCalendar and ProtonDrive. Which sounds very appealing, but not being
able to chose whatever client to use calendar with is a bit concerning and
disappointing. For the storage with ProtonDrive, it really doesn't appeal to me
as I want to self-host my own cloud and not rely on any third-party service.

## Enter Migadu

I first heard about [Migadu][migadu] back in April. I spent two-three days
researching and learning more about them. Their pricing model was a whole new
world to me, I was so used to being limited by the number of addresses and/or
domains I could have. But Migadu had a whole different approach to email. They
base their [pricing](https://www.migadu.com/pricing/) on actual usage instead of
limitations. They don't try to reinvent the email either, they just want to
provide you with their service while giving you control of your own data. They
also use open source solutions and their back-end system is open source on
[Sourcehut](https://git.sr.ht/~migadu/).

Because I have more than 2-3 domains and I use emails quite frequently I decided
I wanted to try them out. They don't offer E2EE, but email was not supposed to
be sent encrypted anyhow and I don't have any problem encrypting my emails using
[PGP][pgp]. Migadu has great guides on how to migrate to using
[IMAP][imap-guide], but note that it's lacking a mention of PM and to migrate
from PM using IMAP required you to have a paid PM account in order to access
email locally using their bridge. Luckily for me the lack of mention of PM the
steps were straight forward and worked flawlessly (it took a while though 😅).

## Conclusion

PM is too limited to justify the cost, but Migadu's business/pricing model is
much more appealing for someone like me who likes to have control. I have now
been using Migadu since the end of April and I couldn't be more satisfied! Their
support is excellent, they usually respond within an hour or so, and are always
happy to answer questions. Their setup process is fairly simple and their
step-by-step instructions are excellent, it just works! I have been so satisfied
that I even had [friByte][fribyte] migrate over, instead of relying on
self-hosting.

I will have to make a proper review of Migadu by the end of the year, I promise!

UPDATE: [My review](/blog/migadu-review)

[^1]:
    [How to reset your Proton password](https://protonmail.com/support/knowledge-base/reset-password/)
    (protonmail.com)

[pm-bridge]: https://protonmail.com/bridge/
[migadu]: https://migadu.com
[pgp]: https://en.wikipedia.org/wiki/Pretty_Good_Privacy
[imap-guide]: https://www.migadu.com/guides/imapsync/
[fribyte]: https://fribyte.no
