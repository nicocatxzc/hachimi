import { useAuthStore } from "@/stores/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
    if (import.meta.server) return;
    startAuthGuard()
});
