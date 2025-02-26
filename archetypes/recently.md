+++
{{- $d := .Date | time.AsTime }}
{{- $lastMonth := $d.AddDate 0 -1 0 }}
title = '{{ strings.TrimSpace (replace (.File.ContentBaseName | replaceRE "\\d{4}-\\d{2}-\\d{2}\\s?" "") "-" " ") | title }}'
description = "What I've been up to since {{ $lastMonth.Month.String }}."
draft = true
+++

<!-- TODO: Add brief intro -->

From the blog this month:
{{- $currentMonth := time.AsTime (printf "%s-01" (now.Format "2006-01")) }}
{{- $posts := sort (where (where .Site.RegularPages "Section" "blog") "Date" "ge" $currentMonth) "Date" "asc" }}
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

{{- $startOfMonth := time.AsTime (printf "%s-01" (now.Format "2006-01")) }}
{{- $endOfMonth := $startOfMonth.AddDate 0 1 -1 }}
{{- $startOfMonthString := $startOfMonth.Format "2006-01-02" }}
{{- $endOfMonthString := $endOfMonth.Format "2006-01-02" }}

{{- $movies := where (where .Site.Data.logs.movies "date" "ge" $startOfMonthString) "date" "le" $endOfMonthString }}
{{ range $movies }}
- **{{ .title }} ({{ .release_year }})** – {{ .review.comment }}
{{ end}}

### TV

{{- $shows := where (where .Site.Data.logs.tv "date" "ge" $startOfMonthString) "date" "le" $endOfMonthString }}
{{ range $shows }}
- **{{ .title }} ({{ .release_year }})** – {{ .review.comment }}
{{ end}}

## 🌐 Links

{{- $url := printf "%s/api/bookmarks?limit=150" (getenv "LINKDING_URL") }}
{{- $opts := dict "headers" (dict "Authorization" (printf "Token %s" (getenv "LINKDING_API"))) }}
{{- with try (resources.GetRemote $url $opts) }}
  {{- with .Err }}
    {{- errorf "%s" . }}
  {{- else with .Value }}
    {{- $data := . | transform.Unmarshal }}
    {{- $startOfMonthString := $startOfMonth.Format "2006-01-02T15:04:05.999999999Z07:00" }}
    {{- $endOfMonthString := $endOfMonth.Format "2006-01-02T15:04:05.999999999Z07:00" }}
    {{- $bookmarks := where (where $data.results "date_modified" "ge" $startOfMonthString) "date_modified" "le" $endOfMonthString }}
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
