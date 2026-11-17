import { fileURLToPath } from "node:url";

const currentDir = fileURLToPath(new URL(".", import.meta.url));

export default defineNuxtConfig({
  // Lets every app and layer file import the shared UI types as "~/types/shared/<Name>"
  alias: {
    "~/types/shared": `${currentDir}types/shared`,
  },
  css: [`${currentDir}/assets/css/main.css`],
  tailwindcss: {
    cssPath: `${currentDir}/assets/css/tailwind.css`,
  },
  components: [
    {
      path: `${currentDir}/components`,
      pathPrefix: false,
    },
  ],
});
