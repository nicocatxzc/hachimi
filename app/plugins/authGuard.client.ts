export default defineNuxtPlugin((nuxtApp) => {
    const auth = useAuthStore();

    watchEffect(() => {
        const now = Date.now() / 1000;

        const isLoggedIn =
            !!auth.verify &&
            !!auth.user?.id &&
            auth.expire > now;

        if (isLoggedIn) {
            startAuthGuard();
        } else {
            stopAuthGuard();
        }
    });
})
