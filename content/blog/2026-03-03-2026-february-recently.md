+++
title = "February 2026"
description = "What I've been up to since January."
tags = ["Recently"]
+++

The year's shortest month is finally over, and I'm three days late to posting
this because I've been too busy to sit down and write. I love excuses! Let's
dive in!

## 🍀 Life

At the very end of last month we moved into our new house and we've spent this
month getting settled. We have a couple more boxes left to unpack, but we're
getting there, slow and steady! A lot of weight has been lifted from my
shoulders after moving in and getting settled. Now we can focus on preparing and
getting ready for the next kid!

We have had friends and family on visit the last three weekends, and as of
writing this we have a couple of friends staying with us with their baby. We are
really taking advantage of the big house. It's really nice to have people over,
it's fun showing everyone around the house and outside.

## 💪 Health

I don't want to check, but I think I managed to run once or twice in February.
It's mostly been snow and ice the whole month, and I have had no problems
finding excuses for not running. However, I have started to build my home gym. I
now have a half-rack, bench, and an Olympic-bar, and a bunch of other equipment
I have acquired over the years. So now a small section of the garage is a
dedicated home gym.

## 🧑‍💻 Development

In the middle of the month I got an email about my weather CLI, [`lyn`]
(formerly `yr`), where they mentioned a couple of features that they said were
missing and shared some other thoughts. Well, I said fuck it, why not try to
tidy up the project a bit with everything I have learned about Go since I
started on the project.

Here's a tiny changelog:

- Added functional options pattern for the package Client
- Added UV index
- Replaced string concatenation with `strings.Builder`
- Refactored the whole helper to reduce the amount of duplicate code
- Added hour input for `lyn today` and `lyn tomorrow`
- Added Beaufort scale
- Added dewpoint
- Added humidity
- Added Kelvin
- Added config (no more needing to specify the location)
- Added sunset/sunrise API to package Client
- Renamed the project to `lyn` because of the API terms of use
- Replace table dependency with my own creation

It's been highly rewarding refactoring and adding to the project that I started
alongside learning Go.

## 🎬 Entertainment

From my [logs](/logs).

### Movies

- **A Million Miles Away (2023)** – Touching story about a guy that just wanted
  to go to space.
- **Hamnet (2025)** – Beautiful, and heartbreaking. The acting was excellent,
  the story felt like a smooth combination of theater-drama and regular
  movie-drama. And man, what a tearjerker.
- **Lock, Stock and Two Smoking Barrels (1998)** – Rewatch. It's been forever
  since I've watched this movie. We laughed so much it hurt sometimes!

### TV

- **Fallout S2** – Excellent! More slow-paced compared to last season, and the
  same with the scale of the worldbuilding. The acting is great! All three main
  characters feel like three separate player characters that have very different
  perks. Had a blast from start to finish.
- **Wonder Man S1** – Breath of fresh air! Trevor is back, and he's more
  interesting than ever. The show works well on its own. The bromance stuff
  actually works. The DODC was the weakest part of the whole show imo.
- **A Knight of the Seven Kingdoms S1** – A really different GoT story. I loved
  the characters. The Dunk and Egg actors were phenomenal together! The show
  could have been better if it had not been for the ever-lasting teasing of a
  "great battle". I'm looking forward to their future adventures!

## 🌐 Links

- [A Day in the Life of an Ensh*ttificator (video)] - I'm really glad that I
  live in Norway were we have such a self-aware consumer council.
- [How can I communicate better with my mom? (video)] – Anthropic really nails
  it here.
- [Everything changes, and nothing changes] – It's indeed a strange time to be a
  software engineer!
- [Nobody Gets Promoted for Simplicity] – "Simplicity is a great virtue, but it
  requires hard work to achieve and education to appreciate. And to make matters
  worse, complexity sells better."
- [AI power users can't stop grinding] – The grind is real! After I installed
  Peon for Claude Code I actually do other stuff besides coding/working when the
  agent is churning on with its gruntwork. Thank you, Erik Johannes, for sharing
  the post!
- [No Skill. No Taste.] – Both skills and taste evolve over time, but you have
  to lift the weights, you don't get stronger using an excavator.
- [Life before social media] – Although social media started around 2003, I
  wasn't exposed to it before 2007/2008. I remember very vividly how hooked some
  of us were then, before all the nonsense that is today. Friends, family, and
  coworkers are starting to wake up to how fucked social life is on these
  platforms. Like the author says, I think more people are starting to realize
  it.
- [AI makes you boring] – Don't outsource your thinking.
- [Fix your tools] – Please do! Mine too, if you can!
- [peon-ping] – This is hilarious!
- [Use Protocols, Not Services] – I agree! I really like email!
- [Outsourcing thinking] – Everything comes back to your approach on how to
  solve stuff: 1. do you ask for help? 2. do you ask for someone do solve
  something for you? 3. do you ask about how you can solve something yourself?
- [Do Less.] – I will.
- [Backseat Software] – "Good software is a tool that you operate, not a channel
  that operates on you."
- [ai;dr] – I agree, and it's OK to use AI/LLMs for help, but don't let it write
  the whole text for you. Ask for steps, help with typos, grammar, etc. Do the
  work.
- [Stop generating, start thinking] – I agree!
- [Maple Mono: Open source monospace font] – Awesome font! Been using it for
  most of the month.
- [Notification underload] – I can relate. For mostly national stuff in Norway,
  we get a notification via SMS and email, but the notification there only tells
  us we have an unread or new notification. Never what it is. It's frustrating.
  But I get it. You should always treat SMS and email like postcards, someone
  could read it.
- [Forget technical debt] – Technical debt isn't only what it sounds like, it's
  much more.
- [The Rise of Sanityware] – I'm tired of enshittification.
- [Why do RSS readers look like email?] – "Phantom obligation" feels like such a
  perfect description of a lot of things being created for the digital world. I
  absolutely am guilty of treating my RSS-reading as a chore, where I have to
  make the count say 0.

[`lyn`]: https://sr.ht/~timharek/lyn/
[A Day in the Life of an Ensh*ttificator (video)]:
  https://www.youtube.com/watch?v=T4Upf_B9RLQ
[How can I communicate better with my mom? (video)]:
  https://www.youtube.com/watch?v=FBSam25u8O4
[Everything changes, and nothing changes]:
  https://btao.org/posts/2026-02-28-everything-changes-nothing-changes/
[Nobody Gets Promoted for Simplicity]:
  https://terriblesoftware.org/2026/03/03/nobody-gets-promoted-for-simplicity/
[AI power users can't stop grinding]:
  https://www.transformernews.ai/p/all-watched-over-by-machines-of-loving-work-intensification-claude-codex-agents-coding
[No Skill. No Taste.]: https://blog.kinglycrow.com/no-skill-no-taste/
[Life before social media]:
  https://ldstephens.net/posts/life-before-social-media/
[AI makes you boring]: https://www.marginalia.nu/log/a_132_ai_bores/
[Fix your tools]: https://ochagavia.nl/blog/fix-your-tools/
[peon-ping]: https://www.peonping.com/
[Use Protocols, Not Services]:
  https://notnotp.com/notes/use-protocols-not-services/
[Outsourcing thinking]:
  https://erikjohannes.no/posts/20260130-outsourcing-thinking/index.html
[Do Less.]: https://usefulfictions.substack.com/p/do-less
[Backseat Software]: https://blog.mikeswanson.com/backseat-software/
[ai;dr]: https://www.0xsid.com/blog/aidr
[Stop generating, start thinking]:
  https://localghost.dev/blog/stop-generating-start-thinking/
[Maple Mono: Open source monospace font]: https://font.subf.dev/en/
[Notification underload]: https://zuma9pt5.com/notification-underload/
[Forget technical debt]: https://www.ufried.com/blog/forget_technical_debt/
[The Rise of Sanityware]: https://thatshubham.com/blog/2026
[Why do RSS readers look like email?]:
  https://www.terrygodier.com/phantom-obligation/ascii
