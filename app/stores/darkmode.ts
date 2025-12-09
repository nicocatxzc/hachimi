import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useDarkmodeStore = defineStore("darkmode", () => {
    const state = ref(true);
    const auto = ref(true);

    const STORAGE_KEY = "darkmode-state";

    // 检查时间并自动设置深色模式
    const check = () => {
        if (!auto.value) return;

        const now = new Date();
        const hours = now.getHours();

        // 18:00 到次日 6:00 为深色模式时间
        const isNightTime = hours >= 18 || hours < 6;

        state.value = isNightTime;

        // 可选：同时更新 HTML 的 class 用于 CSS
        if (isNightTime) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    };

    // 设置状态函数
    type mode = "auto" | "true" | "false"
    const setState = (mode:mode) => {
        if (mode === "auto") {
            auto.value = true;

            setTimeout(() => {
                check();
            }, 1);

        } else {
            auto.value = false;
            state.value = mode === "true";

            if (mode === "true") {
                document.documentElement.classList.add("dark");
                document.documentElement.classList.remove("light");
            } else {
                document.documentElement.classList.add("light");
                document.documentElement.classList.remove("dark");
            }
        }
        saveToStorage();
    };

    // 状态轮换开关
    const toggleMode = () => {
        if (auto.value) {
            setState("true");
        } else {
            if (state.value === true) {
                setState("false");
            } else {
                setState("auto");
            }
        }
    };

    // 持久化到localstorage
    const saveToStorage = () => {
        if (import.meta.server) return;
        const data = {
            auto: auto.value,
            state: state.value,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    // 从localstorage恢复
    const loadFromStorage = () => {
        if (import.meta.server) return;

        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        try {
            const data = JSON.parse(raw);
            if (typeof data.auto === "boolean") auto.value = data.auto;
            if (typeof data.state === "boolean") state.value = data.state;

        } catch (_) {}
    };

    // 载入时恢复
    if (import.meta.client) {
        loadFromStorage();

        // 如果是 auto，立刻校正一次状态
        if (auto.value) {
            setTimeout(check, 1);
        }
    }

    // 自动检查
    const startAutoCheck = () => {
        // 每分钟检查一次
        setInterval(check, 60 * 1000);
    };

    return {
        state,
        auto,
        check,
        setState,
        toggleMode,
        startAutoCheck,
    };
});
