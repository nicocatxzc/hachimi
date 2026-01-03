export default defineEventHandler(async () => {
    const option = useOptionAPI();
    const themeConfig = option.get("theme_sys");

    return themeConfig;
});
