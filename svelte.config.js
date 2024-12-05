import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        alias: {
            $stores: "./src/lib/stores",
            $contexts: "./src/lib/contexts",
            $models: "./src/lib/models",
            $ui: "./src/lib/ui",
            $services: "./src/lib/services",
            $utils: "./src/lib/utils"
        }
    }
};
