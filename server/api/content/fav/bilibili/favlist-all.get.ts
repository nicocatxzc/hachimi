import axios from "axios";

export default defineEventHandler(async (event) => {
    try {
        const sysConfig = await getThemeSysConfig();
        const userID = sysConfig?.sysBilibiliUserId ?? null;

        if (!userID) return null;

        const cacheKey = `bilibili-${userID}-favlist-all`;
        const cache = WPCache();

        let rawData = await cache.get(cacheKey);

        if (!rawData) {
            const res = await axios.get(
                "https://api.bilibili.com/x/v3/fav/folder/created/list-all",
                {
                    headers: {
                        Cookie: sysConfig?.sysBilibiliUserCookie ?? "",
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                        Origin: "https://space.bilibili.com",
                        Referer: "https://space.bilibili.com/",
                    },
                    params: {
                        up_mid: userID,
                    },
                }
            );

            rawData = res.data?.data ?? null;

            if (rawData) {
                await cache.set(cacheKey, rawData, 900);
            }
        }

        if (!rawData) return null;

        const showPrivate = sysConfig?.sysShowPrivateFavlist ?? false;

        const list = Array.isArray(rawData.list)
            ? showPrivate
                ? rawData.list
                : rawData.list.filter((item: { attr: number }) => {
                      const stat = parseFavAttr(item.attr);
                      return !stat.isPrivate;
                  })
            : null;

        return {
            ...rawData,
            list,
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: String(error),
        });
    }
});

function parseFavAttr(attr: number) {
    return {
        isPrivate: (attr & 1) !== 0,
        isDefault: (attr & 2) === 0,
    };
}
