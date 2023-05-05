import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Pages from "vite-plugin-pages";

export default defineConfig({
  base: "/svg-zoom-drag-vue-demo/",
  plugins: [
    vue(),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/],
      dts: "src/auto-import.d.ts",
      imports: ["vue"],
    }),
    Pages({
      dirs: [{ dir: "src/views", baseRoute: "/" }],
      importMode: "async",
    }),
  ],
  server: {
    // https://vitejs.dev/config/server-options.html#server-fs-allow
    fs: {
      // Allow serving files from one level up to the project root
      allow: [".."],
    },
    open: true,
  },
});
