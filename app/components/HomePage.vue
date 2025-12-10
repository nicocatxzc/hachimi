<script lang="ts" setup>
const { postList } = defineProps({
    postList: {
        type: Array,
        required: true,
    },
});
let list = toRaw(postList)?.nodes
</script>

<template>
    <div>
        <HomepageCover />
        <ContentContainer>
            <PostList :posts="list" />
        </ContentContainer>
    </div>
</template>

<style></style>
