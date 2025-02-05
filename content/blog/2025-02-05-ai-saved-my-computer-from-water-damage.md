+++
title = "AI saved my computer from water damage"
description = "How AI/LLM saved my computer from getting permanent water damage."
tags = ["AI", "Thoughts"]
+++

Sorry for the clickbait title, but I couldn't help myself.

Today I forgot to put a water-proof cover on my backpack on my way to work. When
I got to work and took out my laptop, I saw water on the bottom. Weird...

I used paper towels to wipe off the water. But when I switched on my laptop, I
saw that the laptop thought it had headphones in the audio-jack. Weird. Then I
checked the audio-jack and saw more water, and all the other ports on the laptop
had water in them as well. Oh fuck.

I used more paper towels to try to wipe off the water. And it seemed successful,
but my laptop kept insisting that I had something in my audio-jack. Oh well. I
started working.

I have a desktop monitor connected to my laptop, where I use my laptop as a
secondary display. After working for about 10 minutes, my laptop screen started
switching off and my windows on the laptop moved to the monitor. Weird. But then
it came back on again. Probably nothing...

30 minutes later I had a remote meeting where I connected my laptop to the
conference room TV and webcam. The meeting went great for about 20 minutes, then
my screen became black and the call got disconnected... Then I thought maybe it
could be that my laptop thinks I'm closing the lid.

After the meeting my boss said I should use a hair-dryer to evaporate the water.
We only have paper towels in our office, so how am I supposed to do that at
work? Then another coworker said I should run a big AI model locally on my
laptop to get it warm. That sounded too good to be true. So that's exactly what
I did.

Last week I downloaded
[`deepseek-r1:14b`](https://ollama.com/library/deepseek-r1:14b), and I only
tested it, but I didn't delete it. Oh well, what the heck.

Back on my desk I opened Ollama, and in my terminal I ran:

```bash
while true; do ollama run deepseek-r1:14b "write me a program that generates short stories about water damaged laptops at different workplaces"; done
```

My laptop screen kept going off and on a few times, but stopped around lunch.
The laptop was very warm (I don't have a temperature reading, sorry), and it
felt sluggish. Everything was slow.

When I came back from lunch everything was suuuuuper slow, so I stopped the
shell-script. And I went on with my day.

And here I am writing on the very same laptop late at night. The laptop haven't
had any symptoms after lunch. Hooray!
