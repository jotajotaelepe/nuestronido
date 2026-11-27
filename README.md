# Nuestro Nido — Shopify theme

This repository holds the Shopify theme for the Nuestro Nido store, built on
Shopify's Horizon theme (see `NN-README.md` for the custom `nn-*` pieces).

It is connected to Shopify through the Shopify GitHub integration
(Online Store → Themes → Add theme → Connect from GitHub), so Shopify and this
repo stay in sync: changes pushed here show up in the connected theme, and
edits made in the Shopify theme editor are committed back here.

## Layout

The standard Shopify theme folders sit at the root of the repo:

- `assets/` — CSS, JavaScript, images
- `blocks/` — theme blocks
- `config/` — theme settings
- `layout/` — page shells (`theme.liquid`)
- `locales/` — translations
- `sections/`, `snippets/` — reusable building blocks
- `templates/` — page templates
- `nn-setup/` — one-off setup scripts (menus); ignored by Shopify

## Working on it

Make changes on a separate branch and preview them before they reach `main`,
because `main` is the branch the connected Shopify theme follows.
