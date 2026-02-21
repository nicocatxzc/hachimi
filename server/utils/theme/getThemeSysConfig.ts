import type { H3Event } from "#imports";

export default async function getThemeSysConfig(event:H3Event) {
    const option = useOptionAPI(event);
    const themeConfig = option.get("theme_sys");

    return themeConfig;
}
