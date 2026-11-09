# Nuestro Nido · Shopify theme

Built on **Horizon 4.4** (Shopify). Horizon code stays as close to upstream as possible;
Nuestro Nido work lives in `nn-*` files so Horizon updates can be merged later.

## Layout of the customization

| File | What it does |
| --- | --- |
| `snippets/nn-tokens.liquid` | Brand tokens: self-hosted Basis Grotesque Pro, colors, fluid type scale, 8px spacing, page gutter. Overrides Horizon's CSS variables. |
| `snippets/nn-fluid-size.liquid` | `clamp()` helper: mobile size at 375px → desktop size at 1440px. |
| `assets/nn-theme.css` | Brand styling: buttons, announcement bar, header, mega menu promo, footer. |
| `assets/basis-grotesque-pro-*.woff2` | Licensed webfont (Regular 400, Medium 500). Client confirmed the license; keep the receipt on file. |
| `snippets/nn-logo.liquid` | Wordmark + isotipo SVGs exported from Figma. |
| `snippets/nn-mega-promo.liquid` | Promo card / cream panel on the right of a mega menu. |
| `sections/nn-footer.liquid` | Footer from Figma (taupe, isotipo, newsletter, 6 columns, legal row). |
| `nn-setup/` | Not part of the theme (`.shopifyignore`). Menu structure + script to create it. |

Horizon files touched (small, marked with `Nuestro Nido` comments):
`layout/theme.liquid` (loads tokens + CSS), `blocks/_header-logo.liquid` (SVG wordmark fallback),
`blocks/_header-menu.liquid` (4 promo slots + render), `config/*`, `sections/*-group.json`.

## Theme settings

- **Colors → palette**: background `#FFFFFF`, foreground `#1A1A1A`, color1 verde `#19751D`,
  color2 mantequilla `#F3EFA8`, color3 crema `#FAF8E1`, color4 taupe `#938067`,
  color5 gris-600 `#737373`, color6 línea `#E4E0D8`.
  Horizon 4.x replaced color schemes with this palette; sections pick background/text colors from it.
- **Nuestro Nido** group: brand font on/off, desktop + mobile size for Display/H1–H4,
  page gutter, max content width, section spacing.
- **Header → Menu block → Nuestro Nido · promo cards**: 4 slots. Type the top-level menu title
  ("Mayoreo") to attach a card to that mega menu.

## Setup on a store

1. `shopify theme push --unpublished --store <store>` (or connect the GitHub repo in Online Store → Themes).
2. Menus: `SHOPIFY_STORE=… SHOPIFY_ADMIN_TOKEN=… node nn-setup/create-menus.mjs`
   (custom app token with `write_online_store_navigation`), or build them by hand from `nn-setup/menus.json`.
3. Upload promo images in the header menu block.

## Known gaps (phase 1)

- Wishlist heart in the header: waits for the wishlist app (it injects its own icon).
- Checkout can't use Basis Grotesque off Plus; pick the closest grotesque in checkout branding.
- Figma has no H2 or Body L: H2 is proposed at 40/28px; confirm with the designer.
