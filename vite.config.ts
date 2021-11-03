import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
const path = require("path");

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.join(__dirname, "src"),
      },
    ],
  },
  server: {
    host: true,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
