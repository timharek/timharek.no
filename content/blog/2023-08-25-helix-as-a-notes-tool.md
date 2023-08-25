+++
title = "Helix as a notes tool"
description = "Maybe you don't need Obsidian, Notion etc."
[taxonomies]
tags = ["Thoughts", "Note-taking", "100 days to offload", "Helix", "Markdown"]
+++

I've been writing about using paper notes for stuff a couple of times ([Paper
notes][pn_post] & [Revisting paper notes][pn_post2]). So you might ask why am I
talking about using [Helix][helix] as a notes tool? Sometimes I need to jot
something down, like notes for this blog, work-related stuff, a debugging log
etc. I mainly use my paper notes for day-to-day stuff.

## Setup

- A notes folder in `$HOME`.
- Shell-script for creating/opening existing markdown notes.
- Keyboard-shortcut manager to execute the shell-script
- (optional) Nextcloud for syncing my notes.

### Shell-script

```bash
#!/bin/sh

notePath="$HOME/notes"
noteFilename="$notePath/note-$(date +%Y-%m-%d).md"

if [ ! -f $noteFilename ]; then
    echo "# Notes for $(date +%Y-%m-%d)" > $noteFilename
fi

cd $notePath

$EDITOR $noteFilename
```

This script checks if there is an existing note for todays date, if not it will
add a new heading. Then it will `cd` me to the notes-folder and open in my
editor, which is Helix.

The reason why I'm `cd` into the folder is when I close the editor or close it
to the foreground. And also so that I have the correct folder available in the
file picker.

### Keyboard shorcut

I use Alfred on macOS, where I have a workflow with a keyboard shortcut:
`CMD + SHIFT + n`. This opens a new terminal tab and runs my shell-script.

### Syncing

I use what I already have, and that is Nextcloud. So my notes-folder is a synced
and available on my phone via the Nextcloud notes app.

## How does this compare to Obsidian etc.?

I have installed [Marksman][marksman]'s LSP on my machine, which means I get
things like wiki-links, autocomplete and other intellisense-goodies.

<a href="https://asciinema.org/a/xKDVQMY8fiaYRJK5g6fZrhdbO">
    <figure>
        <img
            src="https://asciinema.org/a/xKDVQMY8fiaYRJK5g6fZrhdbO.png"
            width="836"
            alt="Screenshot of Asciinema video of how I take notes."/>
        <figcaption>
            Asciinema of how I take notes.
        </figcaption>
    </figure>
</a>

It feel super light-weight, and I can create new notes by using Helix's
`:run-shell-command` or just `:write <new-file>.md`.

I guess the only thing I'm missing is the graph and see how notes are related.
But for my needs I simply need a place to take notes, and it's nice to have a
way to link them together without running `ls` and checking what the file was
called etc.

And to not contradict my [previous post about Markdown][mk_post], I can also use
normal Markdown-linking with autocomplete.

[pn_post]: /blog/paper-notes
[pn_post2]: /blog/revisting-paper-notes
[helix]: https://helix-editor.com/
[marksman]: https://github.com/artempyanykh/marksman
[mk_post]: /blog/use-markdown-with-markdown
