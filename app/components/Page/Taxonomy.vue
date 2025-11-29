<script lang="ts" setup>
const props = defineProps({
    page: {
        type: Object,
        required: true,
    },
});
let postList = computed(() => {
    return props.page.content;
});
</script>

<template>
    <header>

    </header>
    <PostList :post-list="postList"/>
</template>

<style scoped>

</style>
