<script setup>
const props = defineProps({
    error: {
        type: Object,
        default: () => ({}),
    },
});
const sysConfig = useSysConfig()

// 计算属性
const statusCode = computed(() => props.error.statusCode || 500);
const statusMessage = computed(
    () => props.error.statusMessage || props.error.message
);
const defaultMessage = computed(() =>
    statusCode.value === 404 ? "页面不存在" : "发生错误"
);
const errorDescription = computed(() => {
    if (statusCode.value === 404) {
        return "你要查找的页面可能已被删除、更名或暂时不可用。";
    } else if (statusCode.value === 500) {
        return "服务器内部错误，请稍后重试。";
    } else {
        return props.error.message || "发生了一个意外错误，请稍后重试。";
    }
});
</script>

<template>
    <div class="page-404">
        <div class="page-404-container">
            <div class="page-404-header">
                <h1 class="page-404-number">{{ statusCode }}</h1>
            </div>

            <h2 class="page-404-title">{{ statusMessage ?? defaultMessage }}</h2>

            <p class="page-404-message">
                {{ errorDescription }}
            </p>

            <div class="page-404-actions">
                <a
                    id="golast"
                    href="javascript:history.go(-1);"
                    class="page-404-button"
                >
                    <Icon :name="'fa7-solid:rotate-left'" />
                </a>
                <NuxtLink
                    id="gohome"
                    :to="'/'"
                    class="page-404-button"
                >
                    <Icon name="fa7-solid:house" />
                </NuxtLink>
                <form
                    class="page-404-search-form"
                    method="get"
                    action="/search"
                    role="search"
                >
                    <input
                        class="page-404-search-input"
                        type="search"
                        name="keyword"
                        placeholder="搜索..."
                        required
                    />
                </form>
            </div>

            <div class="page-404-footer">{{ sysConfig?.site_name ?? '' }}</div>
        </div>
    </div>
</template>

<style scoped>
.page-404 {
    --primary: #00b0f0;
    --text: #303030;
    --background: #f5f7fa;
    --card-bg: #ffffff;
    --shadow: 0 20px 60px rgba(0, 0, 0, 0.08);

    height: 100dvh;
    width: 100dvw;

    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif;
    color: var(--text);
}

.page-404-container {
    width: 100%;
    max-width: 580px;
    background-color: rgba(255, 255, 255, 0.85);
    box-shadow: var(--shadow);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    padding: 40px;
    text-align: center;
    z-index: 1;
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    backdrop-filter: saturate(180%) blur(10px);
}

.page-404-header {
    position: relative;
    margin-bottom: 30px;
}

.page-404-number {
    font-size: 120px;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    background-color: var(--primary);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: -5px;
}

.page-404-title {
    font-size: 28px;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--text);
}

.page-404-message {
    font-size: 16px;
    line-height: 1.6;
    color: #666;
    margin-bottom: 30px;
}

.page-404-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-bottom: 35px;
}

.page-404-button {
    box-shadow: 0 1px 30px -4px #e8e8e8;
    color: #505050;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    border: 1px solid #ffffff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    max-width: 60px;
    height: 42px;
}

.page-404-button:hover {
    color: #ffffff;
    background-color: var(--primary);
    border: 1px solid var(--primary);
    box-shadow: 0 1px 20px 10px #e8e8e8;
}

.page-404-search-form {
    position: relative;
    display: flex;
}

.page-404-search-input {
    flex: 1;
    padding: 10px 12px !important;
    font-size: 14px;
    width: 100%;
    box-shadow: 0 1px 30px -4px #e8e8e8 !important;
    color: #505050 !important;
    background: rgba(255, 255, 255, 0.6) !important;
    border-radius: 10px !important;
    border: 1px solid #ffffff !important;
    height: 42px;
}

.page-404-search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(142, 149, 251, 0.2);
}

.page-404-footer {
    margin-top: 30px;
    font-size: 13px;
    color: #999;
}

@media (max-width: 580px) {
    .page-404-container {
        padding: 30px 20px;
    }

    .page-404-number {
        font-size: 90px;
    }

    .page-404-title {
        font-size: 24px;
    }
}
</style>
