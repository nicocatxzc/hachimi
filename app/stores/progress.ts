import { defineStore } from "pinia";

// 滚动进度
export const useScrollStore = defineStore("scroll", () => {
    const { y: scrollY } = useWindowScroll()
    const { height: winHeight } = useWindowSize()
    
    // 自动计算进度
    const progress = computed(() => {
        if (import.meta.server) return 0
        const docHeight = document.documentElement.scrollHeight;
        const maxScroll = docHeight - winHeight.value;
        if (maxScroll <= 0) return 100;
        return Math.min(100, Math.max(0, (scrollY.value / maxScroll) * 100));
    })

    // 自动计算方向
    const direction = ref('down')
    watch(scrollY, (newVal, oldVal) => {
        if (Math.abs(newVal - oldVal) > 5) {
            direction.value = newVal > oldVal ? 'down' : 'up'
        }
    })

    return { progress, direction, scrollY };
});

// 加载进度
export const useLoadStore = defineStore("load", () => {
    let progress = ref(0);
    let loadState = ref("free"); // loading/success/error/free

    type state = "free" | "loading" | "success" | "error"
    function updateState(state:state="free", prog = 0) {
        switch (state) {
            case "free":
                progress.value = 0;
                loadState.value = state;
                break;
            case "loading":
                progress.value = prog;
                loadState.value = state;
                break;
            case "success":
                progress.value = prog ? prog : 100;
                loadState.value = state;
                setTimeout(() => {
                    updateState("free")
                }, 3000);
                break;
            case "error":
                progress.value = prog ? prog : 100;
                loadState.value = state;
                ElMessage({
                    message: "页面加载失败",
                    type: "warning",
                });
                setTimeout(() => {
                    progress.value = 0;
                    loadState.value = "free";
                }, 1000);
                break;

            default:
                progress.value = 0;
                loadState.value = "free";
                break;
        }
    }
    return { progress, loadState, updateState };
});
