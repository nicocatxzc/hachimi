import { useThemeConfigStore } from "#imports";

export const useThemeConfig = () => {
    const store = useThemeConfigStore();
    let previewMode = ref(false);
    const previewData = ref({});

    if (import.meta.client) {
        window.addEventListener("message", (e) => {
            if (e.data?.type === "previewData") {
                previewMode.value = true;
                previewData.value = {...e.data.data};
            }
        });
    }
    return computed(() => previewMode.value ? previewData.value : store.config);
};
