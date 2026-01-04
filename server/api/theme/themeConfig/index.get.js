export default defineEventHandler(async () => {
    const themeConfig = await useThemeConfig();

    return themeConfig;
});
