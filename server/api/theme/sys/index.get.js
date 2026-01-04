export default defineEventHandler(async (event) => {
    const auth = await useValidate(event);
    if (auth?.role != "administrator") {
        return {};
    }
    const config = await useThemeSysConfig();
    return config;
});
