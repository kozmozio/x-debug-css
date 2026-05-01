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

## Chrome Extension (`extension/`)

A Manifest V3 Chrome extension that exposes the same debug modes via a side panel, plus a new **Depth Colors** mode.

### File roles

| File | Role |
|------|------|
| `manifest.json` | MV3 config: `sidePanel`, `activeTab`, `scripting` permissions; content script on all http/https |
| `background.js` | Service worker — calls `chrome.sidePanel.setPanelBehavior` so the icon click opens the panel |
| `content.js` | Injected into every http/https page; owns the CSS styles, keyboard listeners, and message handler |
| `sidepanel.html/css/js` | Panel UI with three toggle buttons; syncs state bidirectionally with `content.js` |
| `generate_icons.py` | One-time script (`python3 generate_icons.py`) to regenerate `icons/*.png` — no external deps |

### Debug modes (extension)

| Shortcut | Button | Action |
|----------|--------|--------|
| `Shift + D` | Blueprint | Blue overlay on all elements |
| `Shift + X` | Outlined | Red 1px outline on all elements |
| `Shift + C` | Depth Colors | Rainbow outline by DOM nesting depth (12 levels) |

### State & messaging flow

- **State lives in `content.js`** as a plain object `{ blueprint, outlined, depth }`.
- **Panel → page**: `sidepanel.js` calls `chrome.tabs.sendMessage(tabId, { action: 'toggle', mode })`.
- **Keyboard → panel**: `content.js` fires `chrome.runtime.sendMessage({ action: 'stateUpdate', state })` after each toggle so the panel buttons stay in sync.
- The content script is wrapped in an IIFE with a guard (`getElementById('x-debug-css-styles')`) to prevent double-injection on navigation.
- Keyboard handler skips when focus is inside `input / textarea / select / [contenteditable]`.

### Loading the extension locally

1. Go to `chrome://extensions`, enable **Developer mode**.
2. Click **Load unpacked**, select the `extension/` folder.

## Key Consistency Notes

The CSS file uses `hsla(210, 80%, ...)` values, while the JS/minified versions use `hsla(210, 100%, ...)`. These are intentionally or accidentally diverged — be aware when editing either file.

The bookmarklet in `bookmark.html` uses the class names `debug-css` / `debug-css-outlined` (no `x-` prefix), which differs from the CSS and JS files that use `x-debug-css` / `x-debug-css-outlined`.
