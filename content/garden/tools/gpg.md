+++
title = "GnuPG"
description = "Useful tips for gpg"
updated = 2022-06-20
+++

<abbr title="Gnu Privacy Guard">[gpg][gpg]</abbr> is a complete and free
implementation of the OpenPGP standard.

## Export public key

### To file

```sh
gpg --export name@example.net > my_key.pub
```

### Send to server

```sh
gpg --export name@example.net | curl -T - https://keys.openpgp.org
```

## Subkeys

It's possible to have multiple keys in one key.

### Adding a subkey

```sh
gpg --edit-key <fingerprint>

gpg> addkey
# Follow the instructions
```

[gpg]: https://gnupg.org/
