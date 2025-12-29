import getSitemap from "../utils/sitemap/getSitemap";

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event);
    const pathname = url.pathname;

    const nuxtconfig = useRuntimeConfig();

    const username = nuxtconfig.wordpressUserName;
    const token = nuxtconfig.wordpressAuthToken;

    const credentials = Buffer.from(`${username}:${token}`).toString("base64");

    // 代理wp-includes
    if (pathname.startsWith("/includes/")) {
        const target =
            nuxtconfig.wordpressURL +
            pathname.replace("/includes", "/wp-includes") +
            url.search;

        return proxyRequest(event, target, {
            headers: {
                Authorization: "Basic " + credentials,
            },
        });
    }

    // 代理wp-content
    if (pathname.startsWith("/content/")) {
        const target =
            nuxtconfig.wordpressURL +
            pathname.replace("/content", "/wp-content") +
            url.search;

        return proxyRequest(event, target, {
            headers: {
                Authorization: "Basic " + credentials,
            },
        });
    }

    // sitemap
    if (pathname.startsWith("/sitemap")) {
        // const wpUrl = pathname + url.search;
        // const res = await useWP.get(wpUrl);
        const sitemap = await getSitemap(pathname, event);
        setHeader(event, "Content-Type", "application/xml");
        return sitemap;
    }
});
