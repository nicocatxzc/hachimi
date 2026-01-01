export default defineNuxtPlugin(async () => {
    const sysConfig = useSysConfigStore();
    const { data } = await useCachedFetch(
        "system-settings",
        "/api/system/settings"
    );
    sysConfig.config = data.value as object;
});
