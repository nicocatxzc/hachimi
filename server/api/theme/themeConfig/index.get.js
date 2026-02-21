export default defineEventHandler(async (event) => {
    const themeConfig = await getThemeConfig(event);

    return themeConfig;
});
