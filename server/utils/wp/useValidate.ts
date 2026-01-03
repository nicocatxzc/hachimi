import type { H3Event, EventHandlerRequest } from "h3";

export default async function useValidate(event: H3Event<EventHandlerRequest>) {
    let auth;
    try {
        const token = getCookie(event, "auth_token");
        if (!token) {
            return;
        }
        auth = await useWP.post("/wp-json/hachimi/v1/auth/validate", {
            token,
        });
        return auth.data;
    } catch {
        throw createError({
            statusCode: 401,
            statusMessage: "Validate Failed",
            message: `认证失败,令牌无效或已过期`,
        });
    }
}
