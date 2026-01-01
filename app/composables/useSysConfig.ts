import { useSysConfigStore } from "#imports";

export const useSysConfig = () => {
    const store = useSysConfigStore();

    return computed(() => store?.config ?? {});
};
