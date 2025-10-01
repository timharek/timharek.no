+++
{{- $d := .Date | time.AsTime }}
{{- $recentlyPosts := sort (where (where .Site.RegularPages "Section" "blog") "Params.tags" "intersect" (slice "Recently")) "Date" "desc" }}
{{- $lastRecentlyPost := index $recentlyPosts 0 }}
{{- $lastRecentlyDate := $lastRecentlyPost.Date | time.AsTime }}
title = '{{ strings.TrimSpace (replace (.File.ContentBaseName | replaceRE "\\d{4}-\\d{2}-\\d{2}\\s?" "") "-" " ") | title }}'
description = "What I've been up to since {{ $lastRecentlyDate.Format "January 2006" }}."
draft = true
tags = ["Recently"]
+++

<!-- TODO: Add brief intro -->

From the blog since my last recently post:
{{- $posts := sort (where (where .Site.RegularPages "Section" "blog") "Date" "gt" $lastRecentlyDate) "Date" "asc" }}
{{- range $posts }}
  - [{{ .Title }}]({{ .Path }})
{{- end }}

## 🍀 Life

<!-- TODO: What has been going on -->

## 💪 Health

<!-- TODO: Have you been keeping active? -->

## 🧑‍💻 Development

<!-- TODO: What have you programming as of late? -->

## 🎬 Entertainment

From my [logs](/logs).

<!-- TODO: What have you been watching this past month -->

### Movies

{{- $startDateString := $lastRecentlyDate.Format "2006-01-02" }}
{{- $endDateString := $d.Format "2006-01-02" }}

{{- $movies := where (where .Site.Data.logs.movies "date" "ge" $startDateString) "date" "le" $endDateString }}
{{ range $movies }}
- **{{ .title }} ({{ .release_year }})** – {{ .review.comment }}
{{ end}}

### TV

{{- $shows := where (where .Site.Data.logs.tv "date" "ge" $startDateString) "date" "le" $endDateString }}
{{ range $shows }}
- **{{ .title }} ({{ .release_year }})** – {{ .review.comment }}
{{ end}}

## 🌐 Links

{{- $timestamp := now.Unix }}
{{- $url := printf "%s/api/bookmarks?limit=150&t=%d" (getenv "LINKDING_URL") $timestamp }}
{{- $opts := dict "headers" (dict "Authorization" (printf "Token %s" (getenv "LINKDING_API"))) }}
{{- with try (resources.GetRemote $url $opts) }}
  {{- with .Err }}
    {{- errorf "%s" . }}
  {{- else with .Value }}
    {{- $data := . | transform.Unmarshal }}
    {{- $startDateBookmarkString := $lastRecentlyDate.Format "2006-01-02T15:04:05.999999999Z07:00" }}
    {{- $endDateBookmarkString := $d.Format "2006-01-02T15:04:05.999999999Z07:00" }}
    {{- $bookmarks := where (where $data.results "date_modified" "ge" $startDateBookmarkString) "date_modified" "le" $endDateBookmarkString }}
    {{ range $bookmarks }}
      {{- if .notes }}
- [{{ .title }}] – {{ .notes }}
      {{- end}}
    {{- end }}
    {{ range $bookmarks }}
      {{- if .notes }}
[{{ .title }}]: {{ .url }}
      {{- end}}
    {{- end }}
  {{- else }}
    {{- errorf "Unable to get remote resource %q" $url }}
  {{- end }}
{{- end }}
