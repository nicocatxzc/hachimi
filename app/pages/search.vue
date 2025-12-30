<script setup>
const route = useRoute();
const keyword = computed(() => {
    return route?.query?.keyword || "";
});
const api = computed(() => {
    return {
        key: `search-${keyword.value}`,
        url: "/api/posts",
        option: {
            promise: true,
            fetchOptions: {
                query: {
                    search: keyword.value,
                },
            },
        },
    };
});

const postList = ref({});
const listKey = ref(api?.value?.key);
const fetchPosts = async () => {
    const { data, promise } = await useCachedFetch(
        api.value.key,
        api.value.url,
        api.value.option
    );
    await promise;
    console.log(data.value);
    if (data.value) {
        postList.value = data.value.posts;
        listKey.value = api?.value?.key;
    } else {
        ElMessage.error("请求出错")
    }
};
// 初始化拉取
await fetchPosts();

// 动态路由拉取
watch(keyword, () => {
    fetchPosts();
});

const inputKeyword = ref(keyword.value || "");
function gotoSearch() {
    navigateTo(`/search?keyword=${inputKeyword.value}`);
}
</script>

<template>
    <div class="page-search">
        <ContentContainer>
            <header class="search-header flex-center">
                <div class="search-box flex-center">
                    <Icon name="fa7-solid:search" class="search-icon" />

                    <input
                        v-model="inputKeyword"
                        type="text"
                        class="search-input"
                        placeholder="搜索文章、标题或摘要"
                        @keyup.enter="gotoSearch"
                    />

                    <button
                        class="search-button"
                        :disabled="!inputKeyword"
                        @click="gotoSearch"
                    >
                        搜索
                    </button>
                </div>
            </header>

            <PostList
                v-if="postList?.nodes && postList?.nodes.length !== 0"
                :key="listKey"
                :post-list="postList"
                :api="api"
            />

            <div v-else class="empty-state">
                <Icon name="fa7-solid:inbox" />
                <p>没有找到相关内容</p>
            </div>
        </ContentContainer>
    </div>
</template>

<style lang="scss" scoped>
.page-search {
    min-height: 90dvh;
    padding-top: 8rem;
}

.search-header {
    .search-box {
        height: 3rem;
        width: min(720px, 92%);
        padding: 0 1.2rem;
        gap: 0.8rem;
    
        background: var(--widget-background-color);
        border: var(--border-sketch);
        border-radius: 1.2rem;
        .search-icon {
            height: 1.5rem;
            width: 1.5rem;
            flex-shrink: 0;
        }
        .search-input {
            font-size: 1.2rem;
            min-width: 5rem;
            flex: 1;
            border: none;
            border-radius: 0;
            outline: none;
            
            color: var(--word-color-first);
            background: transparent;
        }
        
        .search-button {
            flex-shrink: 0;
            padding: 0.45rem 1.1rem;
            border-radius: 0.8rem;
            border: none;
        
            background: var(--active-color);
            color: #fff;
            font-size: 0.9rem;
            cursor: pointer;
        
            transition: opacity 0.2s ease, transform 0.15s ease;
        }
        
        .search-button:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
        
        .search-button:not(:disabled):hover {
            transform: translateY(-1px);
        }
    }
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    margin-top: 6rem;

    color: var(--word-color-third);
}

.empty-state svg {
    font-size: 2rem;
    opacity: 0.6;
}
</style>
