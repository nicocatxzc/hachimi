export default defineEventHandler(async () => {
    try {
        let config = await useWP.get("/wp-json/hachimi/v1/config");
        let siteConfig = await useWPsettings();
        config = replaceWP(config.data)
        return { 
            siteName:siteConfig?.site_name,
            siteDesc:siteConfig?.site_description,
            ...config
         };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: error?.toString() || "请求出错",
        });
    }
});
