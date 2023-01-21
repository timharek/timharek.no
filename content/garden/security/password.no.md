+++
title = "Passord"
updated = 2023-01-21
[extra]
toc_enable = true
toc_level = 2
+++

Passord er noe alle har et forhold til, men svært få vet hvordan de skal
forholde seg til det.

## Bruk et sterkt passord

Og ikke bruk samme passord flere steder.

Alle har hørt det flere ganger, og det gir jo fullstending mening men i praksis
er det ikke enkelt - hvert fall hvis man skal huske alt i hodet.

## 1. Bruk en passordhåndterer

Hva er en passordhåndterer? Jo, det er nettopp hva det høres ut som; det er et
program som håndterer passordene dine for deg!

Siden det strengt tatt er umulig å huske alle passordene sine i dag, siden vi
bruker mer enn 3-4 tjenester (dette gjelder selvsagt for at man skal ha unike
passord hver eneste sted).

Anbefaler å enten bruke en helt lokal passordhåndterer kalt
[KeePassXC](https://keepassxc.org/) eller [Bitwarden](https://bitwarden.com)
hvis man ønsker sømløs skylagring. Begge disse alternativene har åpen kildekode.
Bitwarden kan man til og med selvverte, hvis man skulle ønske det.

## 2. Lag en sterk passfrase som hovedpassord

Hovedpassord, også kalt master og/eller main passord er veldig vesentlig når man
bruker en passordhåndterer.

Hva er en passfrase vs et passord? En passfrase består av flere ord, ofte
separert med et spesialtegn. Ordene i passfrasen burde være helt urelevante til
hverandre, feks. `sykkel*sete*...` eller `eple*appelsin` er ikke urelevante nok
for en sterk passfrase.

### Hvordan lage en sterk passfrase?

Bygg opp en sterk passfrase med minst 3 tilfeldige ord, et eller flere
spesialtegn for å skille ordene og legg til et tilfeldig tall for ekstra styrke.

Jeg pleier å anbefale å lage en passfrase med at brukeren velger seg 3 eller
flere tilfeldige kategorier.

Hvis vi eksempelvis tar for oss disse kategoriene;

1. grønnsaker
1. bilmerker
1. møbler
1. fjell

Jeg velger så et spesialtegn; `@`, for å så velge et tilfeldig tall `18`. Lurt å
velge et speisaltegn som man vet hvor er på både Windows- og Mac-tastatur.

Med disse kategoriene kan vi så sette sammen en sterk passfrase;

`brokkoli@volvo@kommode@ulriken18`

Med en slik passfrase kan man til og med ta vare på kategoriene man skrev ned og
oppbevare dem trygt. Det er kun du som vil vite hvilke ord som passer til de
ulike kategoriene.

## 3. Bruk passordhåndtereren for alle passord

Bytt passord på alle tjenestene du bruker, bruk et auto-generert passord fra
passordhåndtereren din.

## 4. Bruk multi-autentisering hvor det er mulig

Også kalt 2FA / to-faktor autentisering.

Bruk dette hvor det er mulig. Av til så lagrer tjenestene vi bruker passordene
våre i klartekst, som gjør de sårbare til eventuelle lekkasjer eller innbrudd.
