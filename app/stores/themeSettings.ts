import { defineStore } from "pinia";

export const useThemeSettingsStore = defineStore(
    "themeSettings",
    () => {
        let settings = ref({});
        return { settings };
    },
    {
        persist: {
            pick: ["settings"],
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
