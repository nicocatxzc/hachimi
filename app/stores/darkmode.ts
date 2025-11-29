import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useDarkmodeStore = defineStore("darkmode", () => {
    const state = ref(true);
    const auto = ref(true);

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
    };

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
        startAutoCheck,
    };
});
