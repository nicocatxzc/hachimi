import type { H3Event } from "#imports";

export default async function getThemeConfig(event:H3Event) {
    const option = useOptionAPI(event);
    const themeConfig = await option.get("theme_config");

    return themeConfig;
}
