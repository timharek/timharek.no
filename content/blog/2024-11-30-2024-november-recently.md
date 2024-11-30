+++
title = "November 2024"
description = "What I've been up to since October."
tags = ["Recently"]
+++

Work, sickness, a hospital visit, birthday. November has been eventful!

## 🍀 Life

Our daughter is growing fast and is running around all the time! We have gotten
into a good routine with day-to-day now, with work, kindergarten, family-time 
etc.

It hasn't been hectic at work, but I had a deadline before a demo of an 
integration between two systems that was this week. It was stressful before and
during the demo. I believe we managed to give a good demo and that the stressful
time before the demo was worth it!

## 💪 Health

This has to be my worst health month this year, and probably to date. I managed
to get sick twice/thrice, first with the flu, then followed two weeks later with
a sore throat with an inflammation and to top it of I got sudden pain in my 
private area 😅. Been to the doctor thrice, once at the hospital and once at
X-Ray Clinic for ultrasound check.

Therefore I only managed to sneak in a few runs this month, and I'm still 
dealing with pain. The doctors haven't been able to figure anything out based
on my symptoms. Hopefully it goes over by itself.


## 🧑‍💻 Development

Still learning Go! I migrated an integration we made a couple of years ago from
Deno with Oak to Go using the standard library net/http. Since I knew the
outcome, I wrote tests for the whole integration, and then we let both
integrations run at the same time for two weeks to see if the outcome was
different, and it wasn't.

A while ago I mentioned something about a personal CLI for my logs, which initially
started out in Deno called `sekk`, but I have since restarted the project and 
called it `art`. I'm making great progress there, [Charm.sh](https://charm.sh)'s
packages for Go is so good for making CLI-apps, and making them interactive.

And since I'm not able to work on a single project at the time, I have also made
a CLI for accessing Migadu's API: <https://sr.ht/~timharek/migadu>

I think it needs to be more interactive to become a v1.0.0. If you want to help
out, patches are welcome!

## 🎬 Entertainment

From my [logs](/logs).

### Movies

- **Half-Life 2: 20th Anniversary Documentary (2024)** – Great doc about HL2 history and everything that went down at Valve at the time with lawsuits and Steam.
- **The Remarkable Life of Ibelin (2024)** – Touching story about a person who found his sanctuary in playing video games, making a difference in his own way.

### TV

- **The Legend of Vox Machina S3** – It felt like a different show this season, I did enjoy it however, but the pacing felt off. Maybe they can catch-up for next season!
- **Squid Game S1** – After years of convincing, my SO managed to get me to watch this show. It was pretty good, not the story I expected at all. The ending felt preditcable, but it was fun to watch!
- **Avlogga S1** – Norwegian show about disconnecting and not using a smartphone in a year. Cool project, leanred lots!

## 🌐 Links

- [Your E-Mail Validation Logic is Wrong] – Lots of stuff I didn’t know about. But always remember that Go has you covered with [`mail.ParseAddress`](https://pkg.go.dev/net/mail#ParseAddress).
- [Self-Hosting Isn't a Solution; It's A Patch] – While I agree with the author, I also believe that self-hosting can be a means to an end for a lot of people. But we should always resolve the issue at the root instead of beating around the bush. Not sure if regelation is the solution though.
- [No Meetings, No Deadlines, No Full-Time Employees] – I had no idea Gumroad worked like this! It's highly motivating to see a company that is able to do this and have such a positive attitude towards working less, and then having more time for other things in your life.
- [LAN Party House] – This is so awesome!
- [Remind me later – The Secret Knots] – Maybe later.
- [A BSD person tries Alpine Linux] – Now I want to try Alpine Linux on one of my servers.
- [Every Transaction Matters] – Thought-provoking. I started to look at life like this when I started working after my studies, but I never thought about it as transactions. I like this, it simplifies it and gives the way-of-life more meaning, imho.
- [Regular Restarts Are Good, Actually] – I like this, restarting is a good thing!
- [Writing secure Go code] – staticcheck is a really cool tool!
- [HTML link, or button, that is the question] – `<a onclick="alert('i dont get it')">button</a>`
- [Please just stop saying "just"] – Just don't do it.
- [Pockets of time] – This is such a good way of putting it! A little bit every now and then is much better than nothing at all.
- [If you need the money, don't take the job] – Great advice when you do consulting work.
- [Do Hard Things Carefully] – "Your edge is not a constant, but a constantly shifting zone"
- [Make It Ephemeral: Software Should Decay and Lose Data] – This is a great idea! It could work for a lot of different software, like issue trackers, notes etc.
- [Make it Yourself] – Cool projects/book about making things yourself!

[Your E-Mail Validation Logic is Wrong]: https://www.netmeister.org/blog/email.html
[Self-Hosting Isn't a Solution; It's A Patch]: https://matduggan.com/self-hosting-isnt-a-solution-its-a-patch/
[No Meetings, No Deadlines, No Full-Time Employees]: https://sahillavingia.com/work
[LAN Party House]: https://lanparty.house/
[Remind me later – The Secret Knots]: https://thesecretknots.com/comic/remind-me-later/
[A BSD person tries Alpine Linux]: https://rubenerd.com/a-bsd-pserson-trying-alpine-linux/
[Every Transaction Matters]: https://world.hey.com/joan.westenberg/every-transaction-matters-cef1e6b7
[Regular Restarts Are Good, Actually]: https://matt.blwt.io/post/regular-restarts-are-good-actually/
[Writing secure Go code]: https://jarosz.dev/article/writing-secure-go-code/
[HTML link, or button, that is the question]: https://marijkeluttekes.dev/blog/articles/2024/11/04/html-link-or-button-that-is-the-question/
[Please just stop saying "just"]: https://sgringwe.com/2019/10/10/Please-just-stop-saying-just.html
[Pockets of time]: https://hauken.io/pockets/
[If you need the money, don't take the job]: https://bitfieldconsulting.com/posts/need-money
[Do Hard Things Carefully]: https://blog.depthsofrepair.com/p/do-hard-things-carefully
[Make It Ephemeral: Software Should Decay and Lose Data]: https://lucumr.pocoo.org/2024/10/30/make-it-ephemeral/
[Make it Yourself]: https://makeityourself.org/
