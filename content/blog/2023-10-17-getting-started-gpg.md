+++
title = "Getting started with GPG"
description = "How to use GPG for secure email, Git commits, and passwords, ensuring data integrity and authenticity."
updated = 2023-12-11
[taxonomies]
tags = ["100 days to offload", "Tutorial", "GPG", "Tools", "Git", "Passwords", "Email", "Software"]
+++

[GPG][gpg] also known as GNU Privacy Guard is cryptographic tool based on
OpenPGP's standard. OpenPGP is an open source specification of Pretty Good
Privacy (PGP). In short GPG is a tool used to encrypting and decrypting stuff.

GPG is useful for a bunch of different use-cases. Like encrypting messages,
emails, secrets/passwords, signing software etc. I'll focus on using it with
Git, passwords via `pass` and emails.

## Setting up GPG

There may be a GUI solution, but I will show you how you can set up GPG via
their CLI-tool.

First, we need to create a new key:

```bash
gpg --gen-key
```

And then we fill out the necessary data, like our name and email address, and
then we enter a passphrase.

Now, you have a newly generated GPG key!

To list our newly generated key:

```bash
gpg -K
```

```output
sec   ed25519 2023-06-06 [SC]
      F6A1E22056C5806E69528AB2E59C7734F0E10EB5
uid          [  fullst.] Tim Hårek Andreassen <tim@harek.no>
ssb   cv25519 2023-06-06 [E]
```

And here we can see that my fingerprint would be:
`F6A1E22056C5806E69528AB2E59C7734F0E10EB5`. Copy yours, it will be relevant
later.

Your newly generated key will have an expiration date, if you want to change
that you can do that by editing the newly generated key.

```bash
gpg --edit-key <fingerprint>
```

And now gpg will open up your key in edit-mode, type `expire`, and then select
the option that suits you best and verify with `y`. To save the new expiry date
type `save`. Now your key should have a new expiry date!

And voila, you now have a working GPG-key!

## Git

I almost use GPG every day. Every time I commit a new change using `git` I sign
my commits using GPG. There are many reason for why it's smart to sign commits,
and a good reason can be verification of authenticity. To allow others to verify
that the commits attributed to you have not been tampered with and were indeed
created by you.

First, find your GPG key's fingerprint. Then you can do the following:

Specifiy which program you want to use to sign commits with:

```bash
git config --global gpg.program "gpg"
```

Then, add your key:

```bash
git config --global user.signingkey <fingerprint>
```

And to use your key by signing your commits, use:

```bash
git commit -s -S
```

A working example would then be:

```bash
git commit -s -S -m "A commit with a signature"
```

## Passwords/`pass`

If you don't use a password manager, I highly recommend that you do. Maybe you
can give [`pass`][pass] a try.

To set up `pass`:

```bash
pass init <fingerprint>
```

Then you can generate a new password:

```bash
pass generate Email/example.org
```

List all your generated passwords:

```bash
pass
```

Copy a specific password:

```bash
pass -c Email/example.org
```

Read more about `pass` over at the [offical website][pass], or checking out the
man-page.

## Email encryption

This is a simple version of how you can encrypt and decrypt emails. And please
know that you cannot encrypt the email headers, only the email's content. If you
want to encrypt the headers you need to use ProtonMail to ProtonMail or a
similar service.

### Importing public keys

People usually list their public PGP-keys on their website, or through a
thrid-party website like [keys.openpgp.org](https://keys.openpgp.org).

And if you are feeling lucky, you can try to import their public key with the
following command:

```bash
gpg --auto-key-locate keyserver --locate-keys alice@example.org
```

But what if you get an error, but you have the key online on their website?
Well, we can use `curl`!

```bash
curl -sL https://example.org/key | gpg --import
```

### Encrypting

`doc.txt` will be your email contents. And remember to import the public key so
that you are able to actually encrypt the message.

```bash
gpg --encrypt --sign --recipient alice@example.org doc.txt
```

Then attach the encrypted file, `doc.txt.gpg`, to the email you want to send.
And remember to attach your public key so that they reply.

### Decrypting

If someone has sent you a message, and they used your public key to encrypt the
message, you can use the following command to decrypt:

```bash
gpg --decrypt doc.txt.gpg
```

### Exporting public keys

In order to export your public key, you can run the following command:

```bash
gpg --armor --export <fingerprint_or_email>
```

Remember to add this as an attachment to your email so that people can respond.

### Testing

You can try to send me an encrypted email, and I will reply with an encrypted
reply if you were successful. My key, with instructions, is available on my
[Connect-page](/connect). Remeber to add your public key as well :)

## Summary

After this post you may now have a better understanding of what GPG is and how
it works. And if you followed the examples you may now be able to sign your
future commits, encrypt your new passwords, and encrypt and decrypt emails.

[gpg]: https://en.wikipedia.org/wiki/GNU_Privacy_Guard
[pass]: https://www.passwordstore.org/
