+++
title = "Zint"
description = ""
updated = 2022-09-15
template = "layouts/page.html"
+++

The [Zint][zint] project aims to provide a complete cross-platform open source barcode
generating solution.

## Generate QR-codes

```bash
zint -b QRCODE -d "<data_or_url>" -o <output_filename>.svg
```

You can also swap the SVG-extention with PNG.

[zint]: https://www.zint.org.uk/
