import { createApp } from "vue";
import App from "./App.vue";

import { svgWheel, svgDrag } from "svg-zoom-drag-vue-directives";
const app = createApp(App);
svgWheel(app);
svgDrag(app);

import { createRouter, createWebHashHistory } from "vue-router";
import routes from "virtual:generated-pages";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
app.use(router).mount("#app");
