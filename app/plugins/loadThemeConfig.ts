export default defineNuxtPlugin(async (nuxtApp) => {
    const themeConfig = useThemeConfigStore();
    const { data } = await useCachedFetch(
        "themeConfig",
        "/api/theme/themeConfig"
    );
    themeConfig.config = data.value as object;

    if (import.meta.client) {
        if (!data.value?.activeColor) {
            ElMessage.primary("未检测到主题配置，请登录并初始化设置！");
            document.addEventListener("pjax:complete",()=>{
                navigateTo("/dashboard")
            },{once:true})
        }
    }
});
