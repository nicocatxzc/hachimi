<script setup lang="ts">
const props = defineProps<{ show: boolean }>();
const event = useEventBus();

watch(
    () => props.show,
    (val) => {
        event.emit("SiteModel:showBackground", val);
    },
    { immediate: true }
);
</script>

<template>
    <ClientOnly>
        <Teleport to="#site-model-slot">
            <Transition name="model">
                <div v-show="show">
                    <slot />
                </div>
            </Transition>
        </Teleport>
    </ClientOnly>
</template>

<style scoped>
.model-enter-active,
.model-leave-active {
    opacity: 1;
    transform: scale(1);
    transition: all 0.5s ease;
}

.model-enter-from,
.model-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
