+++
date = 2022-07-20
title = "My thoughts on Ghost CMS"
description = "I recently used Ghost CMS for the first time, this is about what I've learned while using it."
[taxonomies]
tags = ["Ghost CMS", "CMS", "Thoughts"]
+++

My first encounter with Ghost CMS was back in 2014 when their [Kickstarter
launched][kickstarter] when I was still a newbie. I remember migrating my
October CMS website to Ghost CMS and never really using it.

Fast-forward to today we are hired to create a website using Ghost CMS
(henceforth referred to as Ghost), this was the first time anyone at work had
tried it. We went in with the assumption that it would be familiar to what we're
used to with Craft CMS.

Let me give you some backstory for the client as for the reason behind choosing
Ghost. They are a small company that mainly do event-hosting for festivals,
wine-tastings, events and give counseling when it comes to wine and food. But
they also have live-streams twice a month where they introduce their subscribers
to a new wine and sometimes a new food recipe. And in order to participate in
these live-streams you need to be a subscriber, and this is where Ghost comes
in. Ghost is built for handling memberships and subscriptions. The people behind
Ghost also provides a service where they can host your site for a fee, Ghost
Pro, which is usually less expensive than having to have a server-hosting
something like for Craft CMS where you need to pay for both the server and a CMS
license, and maybe even some plugins. With Ghost hosted with Ghost Pro much of
the expenses were taken away.

## What I like about Ghost

{{ picture(url="@/blog/2022-07-20-my-thoughts-on-ghost-cms/snapshot.jpg",
  alt="Screenshot of Ghost's dashboard" caption="The beautiful Ghost Dashboard.") }}

I really like the clean and simple admin UI Ghost has, it simple and
streamlined. Nothing fancy, each button and link takes were you want to go. It
handles members, membership tiers, subscriptions and payments out-of-the-box!
Their [theme-starter][theme_starter] is well documented and maintained.

## My frustrations

### Documentation

When we had been developing the theme for about 2-3 weeks Ghost announces Ghost
CMS 5, which looks very cool but we don't really see the need to try to upgrade
as of now, so we continue working with our Ghost CMS 4 version. But then I came
across a problem, I was trying to render the membership tiers but nothing
appeared... even though I looked at their documentation. But then I check their
code-example in our repository and it was different. So I head to GitHub and
learned that Ghost 5.0 had changed the API, and I thought

> Oh, I'm looking at the wrong version in the documentation.

And then I realized that you cannot see the documentation for previous versions
of Ghost CMS, you can only see a version number in the docs. So we upgraded our
Ghost CMS version from 4.x to 5.0, we had some deprecations, but their
`gscan`-tool helped us fixing it.

### Handlebars.js

[Handlebars.js][handlebars] is a templating language that is made to minimal. It
comes with a few built-in filters, and you can extend it by creating your own
filters. However, in Ghost you cannot create your own filters, unless you fork
Ghost yourself and self-host. And Ghost provide some [helpers][ghost_helpers].

#### Conditionals

I had barely touched Handlebars when we started the project and was not too
familiar with the syntax and I assumed it was going to be straight forward. I
quickly came to a roadblock when I couldn't check if a _variable_ was equal to a
_string_.

This is what I initially tried:

```hbs
{{#if myVariable == "my-string"}} Do something {{/if}}
```

This doesn't work, it's invalid. You have to use Ghost's own helper
[`has`][helper_has]. And the syntax looks like this:

```hbs
{{#has myVariable="my-string"}} Do something {{/has}}
```

One would think that something like this would be built-in to Handlebars... 😅
To emphasize my point even further, look at Ghost's
[helpers][ghost_helpers]-page, they four conditionals filters (`if`, `has`,
`unless` & `match`) for something that is built-in in most other templating
languages.

#### Missing helper from the documentation

We wanted the end-user to be able to see which page they were currently on in
the main navigation. Alright let's check their [helpers][ghost_helpers]. No
mention of checking current page. Alright, I tried to search for `current` in
their search, nothing stands out immediately, but there's a result for
[`link_class`][helper_link_class], which isn't listed on the
[helpers][ghost_helpers]-page. This page contains almost what we're looking for,
but we don't want to manually specify which page we're checking is the current.

```hbs
<li class="nav {{link_class for="/about/"}}">About</li>
```

We want to check for a whole list of pages, not one and one page. We discovered
that what we're looking for is under the
[`navigation`-helper][helper_navigation]. The check we are looking for is only
mentioned in one code example with no description of the "check" and it's also
mentioned in the list of attributes.

```hbs
<li class="nav {{#if current}}current-class{{/if}}">About</li>
```

### Custom components and editor cards

I made an assumption that we could create our own components, since we are able
to create stuff in the `partials`-folder. But it's not possible to create custom
components. You are only able to use the ones that are built-in, and there isn't
a lot to choose from. You can't for example have a picture with text on the left
or right side of the picture.

It's also not possible to customize the HTML-structure of the cards from the
editor, you are only able to [deactive its CSS][ghost_cards_css] and update what
each CSS-class should look like, and not alter the CSS-classname.

### More missing documentation (for admins/editors)

While we were working on the theme our client started to migrate their
subscribers from their previous provider. They wanted them to get two months for
free when they signed up again, so they did that by creating a promotion from
within the CMS. But when they tried to open the promotion-link they were sent
directly to Stripe instead of the pop-up preview they were shown in the UI.

{{ picture(url="@/blog/2022-07-20-my-thoughts-on-ghost-cms/pop-preview.png",
  alt="Screenshot of pop-up preview" caption="The preview in Ghost",
  isSmall=true) }}

They contacted Ghost, they replied that you need to active the
[Portal-button][portal_button] in order for the pop-up to work. This is not
mentioned in the documentation either.

## Takeaways, what I learned

So these are my thoughts about Ghost, and it's not like I'm irritated or angry
that we used Ghost for our client. It has worked out great given my (minor)
frustrations. And I've learned a lot about how a limited CMS can be utilized
properly instead of trying to [shoehorning][shoehorning] every inch of it.
Furthermore, I've summarized what I've learned:

- Ghost is mainly for blog-like content.
  - It has limited customizability when it comes to how the content is rendered
    in the frontend.
  - This can be a good thing, makes it easier for editor when they don't have to
    many options.
- I should do more tests and try out the technology before I dive deep.
  - With this project I only read their documentation and looked at their
    examples instead of trying to create simple "Hello world"'s myself.
- Ghost's CLI is pretty good!
  - It's straight forward, you can install Ghost in multiple folders with
    different versions.
- `gscan` is a cool utility.
  - More CMS'es should have this. Runs through your code and checks for
    deprecations and warnings, it's great!
  - It helped us a ton when we were "forced" to upgrade to Ghost CMS 5.
- Handlebars seems like outdated
  - Not meant in a bad-way, I'm sure it was great when you used it in a way
    where you can easily extend it and built upon it.
- It helps to write down stuff like this.
  - Something I can look back on and might be of help for future reference not
    only for me but for others as well.

[ghost]: https://ghost.org
[kickstarter]:
  https://www.kickstarter.com/projects/johnonolan/ghost-just-a-blogging-platform
[theme_starter]: https://github.com/TryGhost/Starter
[ghost_helpers]: https://ghost.org/docs/themes/helpers/
[helper_has]: https://ghost.org/docs/themes/helpers/has/
[helper_link_class]: https://ghost.org/docs/themes/helpers/link_class/
[helper_navigation]: https://ghost.org/docs/themes/helpers/navigation/
[ghost_cards_css]: https://ghost.org/docs/themes/content/#editor-cards
[handlebars]: https://handlebarsjs.com/
[portal_button]: https://ghost.org/help/setting-up-portal/
[shoehorning]: https://www.urbandictionary.com/define.php?term=Shoe-horning
