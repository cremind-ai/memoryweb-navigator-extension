import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  name: "CreMind Memoryweb Navigator",
  description:
    "MemoryWeb Navigator is an AI app that retrieves your previously visited websites based on your search, simplifying online navigation.",
  version: "1.0.0",
  manifest_version: 3,
  icons: {
    "16": "img/CreMind-logo-16.png",
    "48": "img/CreMind-logo-48.png",
    "128": "img/CreMind-logo-128.png",
  },
  action: {
    default_icon: {
      "16": "img/CreMind-logo-16.png",
      "48": "img/CreMind-logo-48.png",
      "128": "img/CreMind-logo-128.png",
    },
    default_title: "CreMind Popup Page",
    default_popup: "popup.html",
  },
  options_page: "options.html",
  options_ui: {
    page: "options.html",
    open_in_tab: true,
  },
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      exclude_matches: ["https://chat.openai.com/*"],
      js: ["src/content/index.ts"],
      run_at: "document_start",
    },
  ],
  web_accessible_resources: [
    {
      resources: ["img/*.png", "js/*.js", "src/*.js"],
      matches: ["http://*/*", "https://*/*"],
    },
  ],
  host_permissions: ["<all_urls>"],
  permissions: ["storage", "contextMenus"],
});
