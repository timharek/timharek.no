[![sourcehut](https://img.shields.io/badge/repository-sourcehut-lightgrey.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSINCiAgICB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+DQogIDxkZWZzPg0KICAgIDxmaWx0ZXIgaWQ9InNoYWRvdyIgeD0iLTEwJSIgeT0iLTEwJSIgd2lkdGg9IjEyNSUiIGhlaWdodD0iMTI1JSI+DQogICAgICA8ZmVEcm9wU2hhZG93IGR4PSIwIiBkeT0iMCIgc3RkRGV2aWF0aW9uPSIxLjUiDQogICAgICAgIGZsb29kLWNvbG9yPSJibGFjayIgLz4NCiAgICA8L2ZpbHRlcj4NCiAgICA8ZmlsdGVyIGlkPSJ0ZXh0LXNoYWRvdyIgeD0iLTEwJSIgeT0iLTEwJSIgd2lkdGg9IjEyNSUiIGhlaWdodD0iMTI1JSI+DQogICAgICA8ZmVEcm9wU2hhZG93IGR4PSIwIiBkeT0iMCIgc3RkRGV2aWF0aW9uPSIxLjUiDQogICAgICAgIGZsb29kLWNvbG9yPSIjQUFBIiAvPg0KICAgIDwvZmlsdGVyPg0KICA8L2RlZnM+DQogIDxjaXJjbGUgY3g9IjUwJSIgY3k9IjUwJSIgcj0iMzglIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQlIg0KICAgIGZpbGw9Im5vbmUiIGZpbHRlcj0idXJsKCNzaGFkb3cpIiAvPg0KICA8Y2lyY2xlIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjM4JSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0JSINCiAgICBmaWxsPSJub25lIiBmaWx0ZXI9InVybCgjc2hhZG93KSIgLz4NCjwvc3ZnPg0KCg==)](https://sr.ht/~timharek/timharek.no)
[![GitHub mirror](https://img.shields.io/badge/mirror-GitHub-black.svg?logo=github)](https://github.com/timharek/timharek.no)
[![Codeberg mirror](https://img.shields.io/badge/mirror-Codeberg-blue.svg?logo=codeberg)](https://codeberg.org/timharek/timharek.no)

[![builds.sr.ht status](https://builds.sr.ht/~timharek/timharek.no.svg)](https://builds.sr.ht/~timharek/timharek.no)

# [timharek.no](https://timharek.no)

My personal website, made with [Zola](https://getzola.org).

## Features

- Blog
- CV
- ++

The CV-page is generated from a simple JSON-file, `static/api/cv.json`, it's
loosely based on [JSON Resume schema](https://jsonresume.org/schema/).

## JSON Schema for logs

```json
{
  "title": "string",
  "description": "string",
  "type": "movie|tv|book|travel|game",
  "date": [ {
    "year": "string",
    "month": "string",
    "day": "string",
    "string": "string"
  } ],
  "details": {
    ...
  }
}
```

`details` is dependent on what `type` it is.

### Movies
```json
"details": {
  "release_year": "number",
  "my_rating": "number",
  "genres": ["string"],
  "director": ["string"]
}
```

### TV Show
```json
"details": {
  "release_year": "number",
  "my_rating": "number",
  "genres": ["string"],
  "director": ["string"],
  "creator": ["string"],
  "season": "number",
  "episode_count": "number"
}
```

### Games
```json
"details": {
  "release_year": "number",
  "my_rating": "number",
  "genres": ["string"],
  "platform": ["string"]
}
```

### Books
```json
"details": {
  "publish_year": "number",
  "my_rating": "number",
  "genres": ["string"],
  "author": ["string"]
}
```

### Travel
```json
"details": {
  "occation": "string",
  "location": {
    "country": "string",
    "cities": ["string"]
  }
}
```


## License

[MIT](LICENSE) &copy; [Tim Hårek](https://timharek.no)
