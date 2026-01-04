export default defineEventHandler(async (event) => {
    let auth;
    try {
        auth = await useValidate(event);
    } catch {
        throw createError({
            statusCode: 401,
            statusMessage: "Validate Failed",
            message: "认证失败,令牌无效或已过期",
        });
    }
    if (auth?.id) {
        const pair = await getVerifyPair();
        return {
            ...auth,
            token: pair.daily,
            verify: pair.verify,
        };
    }
    return;
});
