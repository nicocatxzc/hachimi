export default defineNuxtPlugin(() => {
    const auth = useAuthStore();

    watchEffect(() => {
        const hasCaptcha = !!auth.secret && !!auth.verify;

        const isLoggedIn = !!auth.user?.id && auth.expire > Date.now() / 1000;

        // 已登录：免验证
        if (isLoggedIn) {
            stopCaptchaRevokeTimer();
            return;
        }

        // 没登录，但也没验证码
        if (!hasCaptcha) {
            stopCaptchaRevokeTimer();
            return;
        }

        // 没登录 + 有验证码
        if (isCaptchaChanged(auth.secret, auth.verify)) {
            updateCaptchaSnapshot(auth.secret, auth.verify);
            startCaptchaRevokeTimer();
        }
    });
});
