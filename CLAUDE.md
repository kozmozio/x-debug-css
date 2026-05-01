# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

x-debug-css is a lightweight browser-side CSS debugging tool that visually highlights DOM elements in two modes:

- **Blueprint mode** (`x-debug-css` class on `<html>`): blue background overlay on all elements
- **Outlined mode** (`x-debug-css-outlined` class on `<html>`): red 1px outline on all elements

There is no build system, no package manager, no test suite, and no linting configuration. All files are plain CSS/JS intended to be used directly in a browser.

## Files

- `x-debug.css` — standalone CSS file; consumers manually toggle `.x-debug-css` / `.x-debug-css-outlined` on `<body>` or `<html>`
- `x-debug.js` — full JS version; injects the styles into `<head>` and registers `document.onkeydown` listeners
- `x-debug-css.min.js` — manually maintained minified copy of `x-debug.js`; must be updated by hand when `x-debug.js` changes
- `bookmark.html` — single `<a>` tag with an inline `javascript:` bookmarklet for on-demand use in any browser

## Keyboard Shortcuts (JS version)

| Shortcut | Action |
|----------|--------|
| `Shift + D` | Toggle blueprint (blue) mode |
| `Shift + X` | Toggle outlined (red) mode |

## Key Consistency Notes

The CSS file uses `hsla(210, 80%, ...)` values, while the JS/minified versions use `hsla(210, 100%, ...)`. These are intentionally or accidentally diverged — be aware when editing either file.

The bookmarklet in `bookmark.html` uses the class names `debug-css` / `debug-css-outlined` (no `x-` prefix), which differs from the CSS and JS files that use `x-debug-css` / `x-debug-css-outlined`.
