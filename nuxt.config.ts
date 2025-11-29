// https://nuxt.com/docs/api/configuration/nuxt-config
let wordpressURL = process.env.wordpressURL as string;

const WPendpoint = (new URL(wordpressURL)).host;
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    runtimeConfig: {
        // 私有配置
        wordpressURL: wordpressURL,
        wordpressUserName: process.env.wordpressUserName,
        wordpressAuthToken: process.env.wordpressAuthToken,
        // 公开配置
        public: {
            apiBase: "/api",
        },
    },
    image: {
        provider: 'ipx',
        domains: [WPendpoint],
        alias: {
            wp:WPendpoint
        }
    },
    modules: [
      "@nuxt/eslint",
      "@nuxt/fonts",
      "@nuxt/hints",
      "@nuxt/icon",
      "@nuxt/image",
      "@nuxt/scripts",
      "@element-plus/nuxt",
      "@pinia/nuxt",
    ],
});