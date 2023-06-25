+++
title = 'How to add a simple "Skip to content"-button to your website'
description = 'Two example of how to add a simple "Skip to content"-button for your website, one with HTML/CSS and one with Tailwind.'
[taxonomies]
tags = ["Tutorial", "CSS", "Tailwind", "HTML"]
+++

Six months ago I added a "Skip to content"-button for my website. This was
shortly after learning that according to Norway's official universal design of
ICT that it's required by law for [Norwegian websites that you should be able to
bypass repeated content][uutilsynet_law]. This law is based on [WCAG
2.4.1][wcag241]

## With HTML/CSS

```css
.skip-to-content {
  position: absolute;
  left: -2000px;
  top: 0px;
}
.skip-to-content:focus {
  left: 0px;
}
```

And your HTML markup could look like:

```html
<body>
  <a href="#main" class="skip-to-content">Skip to content</a>
  <!-- Rest of website: Header, nav, hero etc. -->
  <main id="main">Hello world!</main>
</body>
```

[Live example][example].

## With Tailwind

If you're using Tailwind:

```html
<body>
  <a href="#main" class="absolute -left-96 focus:left-0 top-0 bg-white">
    Skip to content
  </a>
  <!-- Rest of website: Header, nav, hero etc. -->
  <main id="main">Hello world!</main>
</body>
```

[Live example][example_tailwind].

## Conclusion

There really isn't anything more to it than that! It's super useful and it can
be easy to implement! It's important to note that this button/link has to be the
first tabbable item on your page and the easiest way to acheive that is by
adding it as the first element in the body.

[uutilsynet_law]:
  https://www.uutilsynet.no/wcag-standarden/241-hoppe-over-blokker-niva/103
[wcag241]: https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0#bypass-blocks
[example]: /skip-to-content.html
[example_tailwind]: /skip-to-content-tailwind.html
