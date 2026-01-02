import { defineStore } from "pinia";

export const useThemeConfigStore = defineStore(
    "themeConfig",
    () => {
        let config = reactive({});
        let tempConfig = reactive({});
        let font = ref("");
        return { config,tempConfig,font };
    },
    {
        persist: {
            pick: ["config","tempConfig","font"],
            storage: {
                getItem: (key) =>
                    import.meta.client ? localStorage.getItem(key) : null,
                setItem: (key, value) => {
                    if (import.meta.client) {
                        localStorage.setItem(key, value);
                    }
                },
            },
        },
    }
);
