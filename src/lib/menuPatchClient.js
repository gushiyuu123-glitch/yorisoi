// src/lib/menuPatchClient.js
const DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const KEY = import.meta.env.VITE_MICROCMS_API_KEY;
const API_ID = import.meta.env.VITE_MICROCMS_MENU_API_ID ?? "menu";

export async function fetchMenuPatch({ signal } = {}) {
  if (!DOMAIN || !KEY) return null;

  const url = `https://${DOMAIN}.microcms.io/api/v1/${API_ID}`;

  const r = await fetch(url, {
    method: "GET",
    headers: { "X-MICROCMS-API-KEY": KEY },
    signal,
  });

  if (!r.ok) return null;
  return r.json();
}