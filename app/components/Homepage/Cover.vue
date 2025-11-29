<template>
    <div class="homepage-cover">
        <figure class="cover">
            <NuxtImg src="https://moeapi.moecat.cc/imgs/pc/img/s22.webp" alt="homepage cover" class="cover-image"/>
        </figure>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.homepage-cover,.cover,.cover-image {
    margin-inline-start: 0;
    margin-block-start: 0;
    height: 100vh;
    width: 100vw;
}
.cover-image {
    object-fit: cover;
}
</style>
