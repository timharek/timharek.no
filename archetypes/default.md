+++
title = '{{ strings.TrimSpace (replace (.File.ContentBaseName | replaceRE "\\d{4}-\\d{2}-\\d{2}\\s?" "") "-" " ") | title }}'
description = 'Write something useful.'
draft = true
+++
