import { throttle } from "lodash-es";
import { useScrollStore } from "~/stores/progress";

export default defineNuxtPlugin((nuxtApp) => {
    const scrollStore = useScrollStore();

    const updateScroll = throttle(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        scrollStore.update(scrollY, winHeight, docHeight);
    },60);

    nuxtApp.hook("app:mounted", () => {
        useScrollStore(nuxtApp.$pinia).reset();
        updateScroll();

        window.addEventListener("scroll", updateScroll, { passive: true });
        window.addEventListener("resize", updateScroll, { passive: true });
    });

    nuxtApp.hook("app:unmounted", () => {
        window.removeEventListener("scroll", updateScroll);
        window.removeEventListener("resize", updateScroll);
        updateScroll.cancel();
    });

    nuxtApp.hook("page:finish", () => {
        useScrollStore(nuxtApp.$pinia).reset();
        updateScroll();
    });
});
