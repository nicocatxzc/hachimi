import { useLoadStore } from "@/stores/progress";

export default defineNuxtPlugin((nuxtApp) => {
    const router = nuxtApp.$router;
    const loadstate = useLoadStore();

    // pjax:send
    router.beforeEach((to, from) => {
        document.dispatchEvent(
            new CustomEvent("pjax:send", { detail: { from: from.fullPath, to: to.fullPath } })
        );
        loadstate.updateState("loading",33)
    });

    // pjax:success
    router.afterEach((to, from) => {
        document.dispatchEvent(
            new CustomEvent("pjax:success", { detail: { from: from.fullPath, to: to.fullPath } })
        );
        loadstate.updateState("loading",66)
    });

    // pjax:complete
    nuxtApp.hook("page:loading:end", () => {
        document.dispatchEvent(new CustomEvent("pjax:complete"));
        loadstate.updateState("success",100)
    });

    // pjax:error
    router.onError((err, to) => {
        document.dispatchEvent(
            new CustomEvent("pjax:error", { detail: { error: err, to } })
        );
        loadstate.updateState("error",50)
    });
});
