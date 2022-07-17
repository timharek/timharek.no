+++
title = "Watched"
description = "What I've watched, mostly recorded here."
template = "layouts/consumed.html"
page_template = "layouts/watched_page.html"
aliases = ["/watching"]
[extra]
json_files = ["static/api/movies.json", "static/api/tv_shows.json"]
person_field = ["director", "creator"]
date_field = "watched_date"
date_field_is_array = true
+++

Movies and TV shows that I've watched. Not a complete list.

<dl class="review__rating">
  <dt aria-label="1 out of 5 stars">★☆☆☆☆</dt>
  <dd>Awful.</dd>
  <dt aria-label="2 out of 5 stars">★★☆☆☆</dt>
  <dd>Waste of time</dd>
  <dt aria-label="3 out of 5 stars">★★★☆☆</dt>
  <dd>Fine, could've managed without it</dd>
  <dt aria-label="4 out of 5 stars">★★★★☆</dt>
  <dd>Definitely worth a watch</dd>
  <dt aria-label="5 out of 5 stars">★★★★★</dt>
  <dd>Must watch!</dd>
</dl>

---
