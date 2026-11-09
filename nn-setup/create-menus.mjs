#!/usr/bin/env node
// Creates or replaces the Nuestro Nido navigation menus from nn-setup/menus.json.
//
// Needs an Admin API access token with read/write_online_store_navigation
// (a custom app in the dev store: Settings → Apps → Develop apps).
//
//   SHOPIFY_STORE=nuestro-nido-dev.myshopify.com SHOPIFY_ADMIN_TOKEN=shpat_xxx node nn-setup/create-menus.mjs
//
// Safe to re-run: existing menus with the same handle are replaced.

import { readFile } from 'node:fs/promises';

const store = process.env.SHOPIFY_STORE;
const token = process.env.SHOPIFY_ADMIN_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || '2025-10';

if (!store || !token) {
  console.error('Set SHOPIFY_STORE and SHOPIFY_ADMIN_TOKEN.');
  process.exit(1);
}

const { menus } = JSON.parse(await readFile(new URL('./menus.json', import.meta.url), 'utf8'));

async function gql(query, variables) {
  const res = await fetch(`https://${store}/admin/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors || json, null, 2));
  return json.data;
}

const toItems = (items = []) =>
  items.map((item) => ({
    title: item.title,
    type: 'HTTP',
    url: item.url,
    items: toItems(item.items),
  }));

const existing = await gql(`{ menus(first: 50) { nodes { id handle } } }`);
const byHandle = Object.fromEntries(existing.menus.nodes.map((m) => [m.handle, m.id]));

for (const menu of menus) {
  const items = toItems(menu.items);
  if (byHandle[menu.handle]) {
    const data = await gql(
      `mutation($id: ID!, $title: String!, $handle: String, $items: [MenuItemUpdateInput!]!) {
        menuUpdate(id: $id, title: $title, handle: $handle, items: $items) { menu { handle } userErrors { field message } }
      }`,
      { id: byHandle[menu.handle], title: menu.title, handle: menu.handle, items }
    );
    report('updated', menu.handle, data.menuUpdate.userErrors);
  } else {
    const data = await gql(
      `mutation($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) {
        menuCreate(title: $title, handle: $handle, items: $items) { menu { handle } userErrors { field message } }
      }`,
      { title: menu.title, handle: menu.handle, items }
    );
    report('created', menu.handle, data.menuCreate.userErrors);
  }
}

function report(action, handle, errors) {
  if (errors.length) console.error(`✗ ${handle}:`, errors);
  else console.log(`✓ ${action} ${handle}`);
}
