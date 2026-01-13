let revokeTimer: ReturnType<typeof setTimeout> | null = null;
let lastTokenSnapshot = "";

const CAPTCHA_TTL = 10 * 60 * 1000; // 10 分钟

export function startCaptchaRevokeTimer() {
    stopCaptchaRevokeTimer();

    revokeTimer = setTimeout(() => {
        const auth = useAuthStore();

        auth.$patch({
            secret: "",
            verify: "",
            needCaptcha: true,
        });
        console.log("验证码已自动吊销");

    }, CAPTCHA_TTL);
}

export function stopCaptchaRevokeTimer() {
    if (revokeTimer) {
        clearTimeout(revokeTimer);
        revokeTimer = null;
    }
}

export function updateCaptchaSnapshot(secret: string, verify: string) {
    lastTokenSnapshot = `${secret}:${verify}`;
}

export function isCaptchaChanged(secret: string, verify: string) {
    return lastTokenSnapshot !== `${secret}:${verify}`;
}
