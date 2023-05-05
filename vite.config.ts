import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Pages from "vite-plugin-pages";

export default defineConfig({
  base: "/svg-zoom-drag-vue-demo/", // 根路径
  // 全局加载的scss文件
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/assets/css/element-plus.scss" as *;`,
        charset: false,
      },
    },
  },
  plugins: [
    // 识别vue
    vue(),
    // 自动导入vue3中composition api函数
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/], // 作用于所有vue文件
      dts: "src/auto-import.d.ts", // 生成全局的vue函数的typescript定义
      imports: ["vue", "vue-router", "vuex"], // vue和vue-router都自动导入
    }),
    // 自动按需导入element-plus组件
    Components({
      dts: "src/element-plus-auto-import.d.ts",
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
    Pages({
      // 自动读取src/views下的vue文件，生成路由信息，默认路由路径'/‘
      dirs: [{ dir: "src/views", baseRoute: "/" }],
      // 异步方式加载路由组件
      importMode: "async",
      // 遍历路由信息，给默认路由加一个redirect
      // extendRoute(route) {
      //   if (route.path === "/") return { ...route, redirect: "login" }
      // }
    }),
  ],
  // 路径别名
  resolve: {
    alias: {
      "@": resolve("src"),
      "~@assets": resolve(__dirname, "src/assets"),
      "@utils": resolve("src/utils"),
    },
  },
  server: {
    // https://vitejs.dev/config/server-options.html#server-fs-allow
    fs: {
      // Allow serving files from one level up to the project root
      allow: [".."],
    },
    open: true, // 是否自动打开浏览器
  },
});
