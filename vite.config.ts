import { defineConfig } from "vite";
import inject from "@rollup/plugin-inject";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    inject({
      // include: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"], // Include only JS/TS files
      // exclude: ["**/*.css", "**/*.scss", "**/*.sass"], // Exclude CSS and other styles
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
