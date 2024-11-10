+++
title = "Spotify logged me out because I logged in"
description = "I wanted to checkout the web interface, but a few hours later my account's password was reset."
tags = ["Thoughts", "Security", "Passwords"]
+++

Yesterday at 22:59 I logged in to my Spotify account through their website to
see what that looked like nowadays. I got a prompt that asked me to send a
security code that had been sent to my email. I used the provided code and I was
logged in. I quickly resumed using Spotify through their desktop app. But today
I got an email telling me that Spotify has reset my password because of
suspicious activity.

First, kudos to Spotify for trying to notify me that my account has had
suspicious activity, but wtf. You sent me an email yesterday with a code so that
you could verify that I am indeed who I say I am. But then you reset my password
anyway and send the reset-email with the reset-password link to the exact same
email address as when you sent the code. I do understand that they probably have
no other way of sending me that reset-email. The wtf-thing here is that this
password-reset has no effect if an attacker had have had access to my
Spotify-password and email account.

And Spotify, please let us use our own 2FA authenticator apps. If you are going
to reset my password every time I log in, then I will move to a different
music-streaming service.

Maybe I should start to buy my own music and self-host a streaming service with
Jellyfin or something. There is a cool iOS client called
[Manet](https://tilo.dev/manet/).
