import { defineStore } from "pinia";

export const useSysConfigStore = defineStore(
    "sysConfig",
    () => {
        let config = reactive({});
        return { config };
    },
    {
        persist: {
            pick: ["config"],
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
