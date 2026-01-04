export default async function useThemeConfig() {
    const option = useOptionAPI();
    const themeConfig = await option.get("theme_config");

    return themeConfig;
}
