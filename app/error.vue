<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    error: {
        type: Object,
        default: () => ({}),
    },
});

const router = useRouter();

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
        return "抱歉，您访问的页面不存在。可能是链接错误或页面已被移除。";
    } else if (statusCode.value === 500) {
        return "服务器内部错误，请稍后重试。";
    } else {
        return props.error.message || "发生了一个意外错误，请稍后重试。";
    }
});

// 方法
const goBack = () => {
    if (window.history.length > 1) {
        router.go(-1);
    } else {
        router.push("/");
    }
};

const goHome = () => {
    router.push("/");
};

const copyErrorDetails = async () => {
    const errorDetails = {
        url: window.location.href,
        statusCode: statusCode.value,
        message: statusMessage.value,
        timestamp: new Date().toISOString(),
    };

    const text = `错误详情:
URL: ${errorDetails.url}
状态码: ${errorDetails.statusCode}
消息: ${errorDetails.message}
时间: ${errorDetails.timestamp}`;

    try {
        await navigator.clipboard.writeText(text);
        alert("错误详情已复制到剪贴板");
    } catch (err) {
        console.error("复制失败:", err);
        alert("复制失败，请手动记录错误信息");
    }
};
</script>

<template>
    <div class="error-container">
        <div class="error-content">
            <!-- 错误图标 -->
            <div class="error-icon">
                <svg
                    v-if="statusCode === 404"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        stroke-width="2"
                    />
                    <path
                        d="M15 9L9 15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                    <path
                        d="M9 9L15 15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                </svg>
                <svg
                    v-else
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 8V12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                    <path
                        d="M12 16H12.01"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        stroke-width="2"
                    />
                </svg>
            </div>

            <!-- 错误标题 -->
            <h1 class="error-title">
                {{ statusCode }} - {{ statusMessage || defaultMessage }}
            </h1>

            <!-- 错误描述 -->
            <p class="error-description">
                {{ errorDescription }}
            </p>

            <!-- 操作按钮 -->
            <div class="error-actions">
                <button class="btn-back" @click="goBack">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 12H5"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12 19L5 12L12 5"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    返回上一页
                </button>

                <button class="btn-home" @click="goHome">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M9 22V12H15V22"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    返回首页
                </button>
            </div>

            <!-- 技术支持信息 -->
            <div class="error-support">
                <p>如果问题持续存在，请联系技术支持</p>
                <button class="btn-copy" @click="copyErrorDetails">
                    复制错误详情
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.error-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.error-content {
    text-align: center;
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
}

.error-icon {
    margin-bottom: 24px;
    color: #e74c3c;
}

.error-title {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 16px;
    font-weight: 600;
}

.error-description {
    color: #7f8c8d;
    line-height: 1.6;
    margin-bottom: 32px;
    font-size: 1.1rem;
}

.error-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
}

button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-back {
    background-color: #3498db;
    color: white;
}

.btn-back:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

.btn-home {
    background-color: #2ecc71;
    color: white;
}

.btn-home:hover {
    background-color: #27ae60;
    transform: translateY(-2px);
}

.error-support {
    border-top: 1px solid #ecf0f1;
    padding-top: 24px;
}

.error-support p {
    color: #95a5a6;
    margin-bottom: 12px;
    font-size: 0.9rem;
}

.btn-copy {
    background-color: #95a5a6;
    color: white;
    font-size: 0.9rem;
    padding: 8px 16px;
}

.btn-copy:hover {
    background-color: #7f8c8d;
}

/* 响应式设计 */
@media (max-width: 600px) {
    .error-content {
        padding: 24px;
        margin: 0 10px;
    }

    .error-title {
        font-size: 1.5rem;
    }

    .error-actions {
        flex-direction: column;
        align-items: center;
    }

    button {
        width: 100%;
        max-width: 250px;
        justify-content: center;
    }
}
</style>
