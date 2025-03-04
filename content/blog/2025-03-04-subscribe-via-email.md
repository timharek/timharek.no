+++
title = 'Subscribe via e-mail'
description = 'You can now subscribe to my blog via e-mail!'
tags = ["Meta"]
+++

As of today you can subscribe to the blog via email, not just RSS or by browsing
the site frequently.

Not everyone uses RSS, and some even prefer to subscribe via email for their
online consumption outside of social media and such. And now you can!

I signed up for [Buttondown] today, and I opted for their basic plan to simplify
the process of not having to copy/paste my posts over. Buttondown uses my
RSS-feed to fetch the latest posts and send them out as a newsletter. It can do
it automatically, but to begin with I prefer to click the "send"-button.

You can subscribe below:

<form
  action="https://buttondown.com/api/emails/embed-subscribe/timharek"
  method="post"
  target="popupwindow"
  onsubmit="window.open('https://buttondown.com/timharek', 'popupwindow')"
  class="embeddable-buttondown-form space-y-2 w-full"
>
  <div class="w-full">
    <label for="bd-email" class="block">E-mail</label>
    <input type="email" name="email" id="bd-email" class="w-full p-2 border-b-2 border-primary" placeholder="you@example.org" />
  </div>

  <input type="submit" value="Subscribe via email" class="button cursor-pointer" />
</form>

The [Subscribe](/subscribe)-page is also updated with the same form.

And I won't be using any tracking with my Buttondown-account, affilate links,
ads etc. It will just be a plain copy of what's already been posted to my blog
with a link to it. You can unsubscribe anytime you want, all emails will have an
unsubscribe link.

[Buttondown]: https://buttondown.com
