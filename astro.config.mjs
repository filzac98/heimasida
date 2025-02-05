import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: "server", // Ensure output is set to 'server' for SSR
  adapter: netlify(),
});
