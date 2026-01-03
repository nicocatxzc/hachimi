export default defineEventHandler(async (event) => {
    let auth;
    try {
        const auth = await useValidate(event);
    } catch (e) {
        throw createError({
            statusCode: 401,
            statusMessage: "Validate Failed",
            message: "认证失败,令牌无效或已过期",
        });
    }
    const pair = await getVerifyPair();
    return {
        ...auth,
        token: pair.daily,
        verify: pair.verify,
    };
});
