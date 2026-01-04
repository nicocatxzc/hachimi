import type { H3Event, EventHandlerRequest } from "h3";
interface AuthUser {
    id: number;
    name: string;
    email: string;
    roles: string[];
    description: string;
    slug: string;
    avatar: {
        url_96: string;
        url_150: string;
        url_300: string;
    };
    management: {
        admin: string;
        newpost: string;
    };
    expire: string;
}
interface AuthResponse {
    data: AuthUser;
}

export default async function useValidate(event: H3Event<EventHandlerRequest>) {
    let auth;
    try {
        const token = getCookie(event, "auth_token");
        if (!token) {
            return;
        }
        auth = await useWP.post<AuthResponse>(
            "/wp-json/hachimi/v1/auth/validate",
            {
                token,
            }
        );
        return auth.data;
    } catch {
        throw createError({
            statusCode: 401,
            statusMessage: "Validate Failed",
            message: `认证失败,令牌无效或已过期`,
        });
    }
}
