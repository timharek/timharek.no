+++
title = "A year with Go"
description = "What I've learned after working with Go for a year."
tags = ["Go", "Programming", "Thoughts"]
+++

August last year a coworker asked me if we could use Go for an upcoming project,
integrating an invoice system to an ERP. We had been using mostly Node and Deno
with TypeScript for all our needs to this point, but the project was supposed to
be small, so we agreed that he could try for this project. A couple of weeks
later I was tasked with a similar project (at least we thought), I asked my
coworker to help me get started with Go and how stuff worked.

One year ago, today, I started my first Go-project. I'm still maintaining and
updating this project today. My passion for Go has grown a lot over the last
year, and this is what I've learned after a year with Go.

## 1. Modules/packages

It may just be me, but Go's module system fits perfectly with my brain. In Go
everything is scoped within packages, and the thing that decides if something is
part of a package is its folder.

Let's take this project structure as an example:

```plain
project/
     ├── main.go
     ├── gps/
     │   ├── coordinates.go
     │   └── calculator.go
     └── map/
         └── map.go
```

The `main.go` would (and should) most likely be the main package. And in the
`gps` and `map` folders, their package names would be the folder names (not
required).

And one of the nice things about this is that everything within the `gps`
package is accessible in any file in that package without having extra imports.
And when for example the `map` package uses something from the `gps` package, it
has access to everything that has been exported within the package, regardless
of the file, example: `gps.Foo()`. An added benefit here is that if you ever
need to rename a file within a package, nothing breaks!

`gps.Foo()` brings me to another great thing about Go's module system: exported
stuff starts with an uppercase letter, and lowercase for the other way around.

```go
package gps

import "fmt"

func Foo() error {
  return fmt.Errorf("an error")
}

func bar() {
  // does something cool
}
```

```go
package map

import "gps"

func GenerateMap() {
  gps.Foo() // works
  gps.bar() // doesn't work
}
```

This removes a lot of syntax, which I really appreciate!

If you need to "hide" packages from each other, you can the special `internal`
directory. You can have multiple `internal` directories (if you need to).

In the beginning I used this
[project-layout](https://github.com/golang-standards/project-layout) repo as
inspiration for how to structure my projects.

## 2. Error-handling

I can return more than one value, at the same time?!

```go
package gps

func Foo() (*Coordinates, error) {
  coords, err := getCoordinates()
  if err != nil {
    return nil, err
  }

  return coords, nil
}
```

Like most things in real life, things break sometimes. And everyone is happier
when we are able to handle when something breaks instead of pulling a hard-stop.
Being able to return multiple values is always useful, for example when handling
an API response, transforming it into your own type, and pushing the data to a
new API again. A lot of stuff can break along the way there, and having the
ability to always return an error goes a long way.

Errors in Go are first-class citizens. If I need to specify my own error that
I'm going to use multiple times, I can use `errors.New("my error")`, but if I
just need to return a quick error I can use `fmt.Errorf("a quick error")`. And
what's powerful with the latter, is that I can include an additional error:
`fmt.Errorf("a quick error: %w", err)`. You can also do that with the
"reusable"-error with `errors.New` by using `errors.Join(err1, err2)`.

```go
package gps

import "errors"

var MyErr = errors.New("my error")

func Foo1() (*Coordinates, error) {
  coords, err := getCoordinates()
  if err != nil {
    return nil, MyErr
  }

  return coords, nil
}

func Foo2() (*Coordinates, error) {
  coords, err := getCoordinates()
  if err != nil {
    return nil, fmt.Errorf("a quick error")
  }

  return coords, nil
}

func Foo3() (*Coordinates, error) {
  coords, err := getCoordinates()
  if err != nil {
    return nil, fmt.Errorf("a quick error: %w", err)
  }

  return coords, nil
}

func Foo4() (*Coordinates, error) {
  coords, err := getCoordinates()
  if err != nil {
    return nil, errors.Join(err, MyErr)
  }

  return coords, nil
}
```

## 3. Standard library

I still come across new stuff in the standard library that I didn't know was
rightly available, there's just so much.

If I want to do stuff with the filesystem, there's a package for that,
[`os`](https://pkg.go.dev/os). If I want to compare different characters or just
unicode stuff: [`unicode`](https://pkg.go.dev/unicode@go1.25.1). If I want to
create a web server: [`net/http`](https://pkg.go.dev/net/http@go1.25.1). There's
so much, you should probably look through the standard library before you try to
invent something.

In my weather-CLI, [yr], I use `os.TempDir()` to get the system's temporary
directory to save your queried results for quick and simple caching.

## 4. Compiling

I love that I can grab a tool and/or CLI with `go install` and it will just work
on my system. The compile time is fast, and I haven't encountered any
difficulties compiling my projects.

There's even an option to compile your binary with additional data, using
`-ldflags`.

```bash
go build -ldflags -X main.Version=v1.0.0 main.go
```

```go
package main

var Version string // Data comes from the LDFlags.

func main() {
  print(Version)
}
```

## 5. Deployment

Just compile, and you're good to go. You get a single binary you can deploy
anywhere. You can specify which architecture you want to compile to by setting
the `GOOS` variable. I have deployed binaries with and without Docker. The
`Dockerfile` can be very simple (from
[docker.com](https://docs.docker.com/guides/golang/build-images/#create-a-dockerfile-for-the-application)):

```Dockerfile
# syntax=docker/dockerfile:1

FROM golang:1.25

# Set destination for COPY
WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code. Note the slash at the end, as explained in
# https://docs.docker.com/reference/dockerfile/#copy
COPY *.go ./

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping

# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/reference/dockerfile/#expose
EXPOSE 8080

# Run
CMD ["/docker-gs-ping"]
```

## 6. Types and interfaces

Go is statically typed, that means you have to define all your types before
compiling and that your compiler catches type mismatches at compile time,
preventing runtime type errors. This can look very verbose, but that is an
advantage. You get to see exactly what the author intended what the types should
be.

```go
type Person struct {
  Firstname string
  Lastname string
  Birthdate time.Time
}
```

And with Go's fantastic type system, you get to put methods on all of your
types. Just like your OOP-bros do. Let's use the `Person` as an example:

```go
// Returns p's fullname based on Firstname and Lastname
func (p *Person) Fullname() string {
  return fmt.Sprintf("%s %s", p.Firstname, p.Lastname)
}
```

Or let's check if the persons `Birthdate` is today:

```go
// Returns whether p's Birthdate is today
func (p *Person) IsBirthday() bool {
  now := time.Now()
  return p.Birthdate.Year() == now.Year() &&
          p.Birthdate.Month() == now.Month() &&
          p.Birthdate.Day() == now.Day()
}
```

And voila! Super simple examples, but totally plausible use cases. However,
there's an even more powerful way to use the methods! You can define new types
on top of existing types:

```go
type Employee Person

// Returns the initials of the employee's first and last name
//
// NOTE: Doesn't handle multiple firstnames and lastnames
func (e *Employee) Initials() string {
   if len(e.Firstname) == 0 || len(e.Lastname) == 0 {
       return ""
   }
   return fmt.Sprintf("%c%c", e.Firstname[0], e.Lastname[0])
}
```

I recently used this for an API-client I made for an API where everything
returned is a string, but some properties are booleans, ints, floats etc.
Therefore I created my own types: `StringBool`, `StringInt`, `StringFloat`, etc.
With my own types I could do the the type conversions as methods to get the
actual types.

Interfaces was something I struggled with in the beginning. They are invisible,
unless you know how to check if a type is implementing one. There's a great post
about
[comparing Go's interfaces with their niece picking their nose](https://ashwiniag.com/interfaces-in-go-simplified-with-a-silly-analogy/).
This analogy works because there's no way for you to tell your type that you
have implemented an interface, except by doing a simple "hack". Look at this
example:

```go
type Task interface {
  Name() string
  Run(c *Client) error
}

type Order struct {
  // ... whatever field it needs
}

func (o *Order) Name() string {
  // ...
}

func (o *Order) Run(c *Client) error {
  // ...
}

var _ Task = &Order{} // <-- The hack.
```

The hack will make sure you have implemented all the correct methods, if not,
the compiler will complain which ones are missing. And an added bonus is that
some LSPs support code-actions on this "hack" to let you auto-generate the
missing methods!

## 7. Tooling

Go is an opinionated language, and where you can see that is with its tooling.
This is what I use frequently:

- `go fmt`
- `go test`
- `go generate`
- `go mod`
- `go tool` (new in v1.24)

Using the tooling can become a journey, I still look up stuff only for how to do
`go test` stuff because the help from the CLI isn't sufficient for me, there's a
bunch of text with some flags. You get used to it.

### `go fmt`

Having this built-in reminds me of Deno, and I know Deno was inspired by Go to
have it built-in. But in Go, there's no way to configure it. You just run the
formatter and it does its thing. You don't say that you want a tab to be 2
spaces wide. Someone else decided for you.

### `go test`

Like `go fmt`, testing is built into the language, and there's no real fuzz
about it! It works as you would expect, but if you want to print stuff, even
when all the tests are passing, you need to pass the verbose flag `-v`. And if
you want to run the "short" tests, you use `-short`.

### `go generate`

Code-generation was not something I was very familiar with before I started
writing Go. I've mostly used it when generating API clients for OpenAPI and
GraphQL specifications.

Having `go generate` pick up files when they have a special comment (called a
directive):

```go
//go:generate your-cli-cmd

package gps
// more code...
```

... is really cool!

### `go mod`

I mostly just use `go mod tidy`, but I do also use `go mod init <project-name>`.
And recently I started to use it more for my tooling, like what Alex Edwards
showed in [How to manage tool dependencies in Go 1.24+]. I like to keep my
Go-tools separate from my primary `go.mod`.

[How to manage tool dependencies in Go 1.24+]:
  https://www.alexedwards.net/blog/how-to-manage-tool-dependencies-in-go-1.24-plus#using-a-separate-modfile-for-tools

### `go tool`

Instead of installing Go tools directly, you can do it just for your project
using `go get -tool <url/path to tool>`. Then you can use the tool with
`go tool <tool-name>`. This is super handy for projects that require
live-reloading with [air](https://github.com/air-verse/air). Instead of
requiring the developer to install `air` directly, they can just use
`go tool air`, because it's defined in `go.mod` (or `go.tool.mod` as noted under
[`go mod`](#go-mod)).

### Tooling site-note

One thing that took some getting used to is that using a `go <cmd>` doesn't
implicitly use the current directory, if you want that you need to run
`go <cmd> ./...`. In my head a single `.` should suffice, but that can give
unexpected results.

## 8. Files

For a large project at work, we need to provide our "end-users" with
documentation, and we've found that separating the docs from the codebase makes
it easy for them to fall out of sync. So when I learned about [`embed`], I knew
that this would save us a lot of time. The `embed` package makes it super easy
to embed files or directories in the compiled binary. No more having to include
Markdown-files or separate Google Docs.

```go
package main

//go:embed docs/important.md
var Docs string

func main() {
  print(Docs)
}
```

The example above takes the text content from `docs/important.md` straight into
`Docs` at compile time. Then you can do what you want with the string. It's
super powerful.

## 9. Maintainability

In my opinion the modules/package system and type system makes a Go-project
quick to grasp. You can see which packages depend on each other, which files are
combined into a package. I maintained my very first Go-project for a year now,
and I still have some of the initial logic, but over a long time project has
been straightforward to maintain. I've had coworkers contribute without a lot of
questions because of the structure and my comments.

## 10. Projects

After one year I have started a bunch of projects:

- [yr] - Weather CLI
- [git-bump](https://git.sr.ht/~timharek/git-bump) - Bumping versions with Git
- [migadu CLI](https://git.sr.ht/~timharek/migadu) - Interacting with Migadu's
  API as a CLI
- [bir](https://git.sr.ht/~timharek/bir) - Getting my trash collection days as a
  calendar feed, instead of an app
- [art](https://git.sr.ht/~timharek/art) - Personal CLI tool for logging
- [openlibrary-go](https://git.sr.ht/~timharek/openlibrary-go) -
  [OpenLibrary](https://openlibrary.org/) API client

And I started a couple of open source projects at work, which is just API
clients, but they do require some maintenance and love. We update them whenever
we see the need for it for ourselves. We are open to contributions, but it has
only been used by us as far as we know:

- [24sevenoffice-go](https://github.com/valuetechdev/24sevenoffice-go) - API
  clients for [24SevenOffice](https://24sevenoffice.com/no/)'s SOAP, REST, and
  Payroll APIs.
- [tripletex-go](https://github.com/valuetechdev/tripletex-go) - API client for
  [Tripletex](https://www.tripletex.no/)

The big project I have referenced throughout this post has been an
integration-platform for integrating multiple ERP-systems, 24SevenOffice and
Tripletex, with [Contracting Works](https://www.contracting.works/). It started
out as a small project with a single client and ERP-system, but has snowballed
to a multi-tenant and multi-ERP project. Everything resides in a monolithic
repo.

## Closing thoughts

Go is so much fun. I love to write it every single day. Many thanks to my
coworker, Fredrik, for suggesting it last year. My passion for programming is
forever changed, and enhanced!

I look forward to all the upcoming and existing projects! Let us see what I've
learned after two years with Go!

[yr]: https://sr.ht/~timharek/yr/
[`embed`]: https://pkg.go.dev/embed@go1.25.1
