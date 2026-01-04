export default async function useThemeSysConfig() {
    const option = useOptionAPI();
    const themeConfig = option.get("theme_sys");

    return themeConfig;
}
