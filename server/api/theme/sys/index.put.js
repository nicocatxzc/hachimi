export default defineEventHandler(async (event) => {
    await useValidate(event)

    const option = useOptionAPI();

    const res = option.set("theme_sys",event);

    return res;
});
