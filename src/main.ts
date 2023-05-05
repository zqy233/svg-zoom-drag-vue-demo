import { createApp } from "vue";
import App from "./App.vue";
// import { svgWheel, svgDrag } from "./directive/svg"
import { svgWheel, svgDrag } from "svg-zoom-drag-vue-directives";

const app = createApp(App);
svgWheel(app);
svgDrag(app);

import { createRouter, createWebHashHistory } from "vue-router";
// 这里就是vite-plugin-pages生成的路由信息，正常使用即可
import routes from "virtual:generated-pages";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
app.use(router).mount("#app");
