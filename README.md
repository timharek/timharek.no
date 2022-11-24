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
