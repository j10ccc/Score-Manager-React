import { defineConfig } from "@umijs/max";
import { routes } from "./config";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "@umijs/max",
  },
  routes,
  npmClient: "pnpm",
  proxy: {
    "/api": {
      target: "http://127.0.0.1:4523/m1/2138734-0-default",
      changeOrigin: true,
    },
  },
});
