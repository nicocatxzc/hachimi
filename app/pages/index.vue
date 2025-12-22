<script setup>
const api = {
    key: "post-list-homepage",
    url: "/api/posts",
    option: {
        promise: true,
    },
};
const { data, promise } = await useCachedFetch(api.key, api.url, api.option);
await promise;
const posts = computed(() => (data.value?.posts ? data.value.posts : {}));
</script>

<template>
    <div>
        <HomepageCover />
        <ContentContainer>
            <h2 class="block-title">展栏</h2>
            <HomepageShow />
            <h2 class="block-title">破事水</h2>
            <PostList :post-list="posts" :api="api" />
        </ContentContainer>
    </div>
</template>

<style scoped>
.block-title {
    font-size: 1.2rem;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: .6rem;
}
</style>
