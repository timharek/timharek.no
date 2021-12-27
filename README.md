# [timharek.no](https://timharek.no)

This is my personal website, made with [Zola](https://getzola.org).

It's pretty much tailored to my liking, but feel free to clone/fork this repo.

## Features

- Blog
- [CV](#cv) (Resume)
- Projects (portfolio) structure on frontpage
- "Uses"-page

### CV

The CV is generated from a simple JSON-file, `content/cv/cv.json`.

Here you can specify your experiences (work, education & voluntary) and skills.

Example

```json
"work": [
  {
    "glyph": "/cv/logo.svg",
    "name": "Name of your work place",
    "relevant": true,
    "role": [
      {
        "desc": [
          "Doing meaningful stuff.",
          "Creating Zola templates."
        ],
        "name": "Creator",
        "present": true,
        "end": "2022-01-01"
      }
    ]
  }
]
```

- `work` is the name of the experience type. For this project there are three
different types; **work**, **education** and **voluntary**.
- `glyph` is optional, it will default to a blank circle SVG.
- `relevant` is if you'd like to have two CVs. One with what you deem relevant
  and another with all your relevant experiences as well as those who are not as
  relevant.
- `role` is an array. You can have multiple roles at one experience.

## License

[MIT](LICENSE) &copy; [Tim Hårek](https://timharek.no)
