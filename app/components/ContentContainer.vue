<script lang="ts" setup></script>

<template>
    <div class="page">
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.page {
  width: 100vw;
  display: flex;
  justify-content: center;
}
.content {
  max-width: 860px;
  width: 100%;
}
@media (max-width:860px) {
  .content {
    padding: 0 4%;
  }
}
</style>
