import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import App from "./App.vue";
import ElementIndexStyle from "element-plus/dist/index.css";
import CssVarsStyle from "element-plus/theme-chalk/dark/css-vars.css";
import CustomElementIndexStyle from "@/styles/element/index.scss";
import GithubDarkStyle from "@/styles/highlight.js/github-dark.css";
import GlobalIndexStyle from "@/styles/index.scss";
import IndexStyle from "./index.scss";

export let shadowRoot: ShadowRoot;

function initExtension() {
  const shadowHost = document.createElement("memoryweb-navigator-extension");
  document.body.appendChild(shadowHost);
  shadowRoot = shadowHost.attachShadow({ mode: "open" });

  const appContainer = document.createElement("memoryweb-navigator-extension");
  appContainer.id = "memoryweb-navigator-extension";
  shadowRoot.appendChild(appContainer);

  const style = document.createElement("style");
  style.appendChild(document.createTextNode(ElementIndexStyle));
  style.appendChild(document.createTextNode(CssVarsStyle));
  style.appendChild(document.createTextNode(CustomElementIndexStyle));
  style.appendChild(document.createTextNode(GithubDarkStyle));
  style.appendChild(document.createTextNode(GlobalIndexStyle));
  style.appendChild(document.createTextNode(IndexStyle));
  shadowRoot.appendChild(style);

  const app = createApp(App).use(createPinia());
  app.use(ElementPlus, { zIndex: 2147483647 });
  app.mount(appContainer);
}

const el = document.querySelector("body");
if (el) {
  initExtension();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initExtension();
  });
}
