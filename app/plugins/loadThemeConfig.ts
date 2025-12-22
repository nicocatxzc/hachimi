export default defineNuxtPlugin(async () => {
    let themeConfig = useThemeConfigStore();
    let {data} = await useCachedFetch("themeConfig","/api/themeConfig")
    console.log(data)
    themeConfig.config = data.value as Object
});
