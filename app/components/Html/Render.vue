<script setup>
const props = defineProps({
    html: { type: String, required: true },
    componentsMap: { type: Object, default: () => ({}) },
    containerTag: { type: String, default: "div" },
});

const ast = reactive([]);

watch(
    () => props.html,
    (v) => {
        const newAst = parseHtmlToAst(v || "");
        ast.splice(0, ast.length, ...newAst);
    },
    { immediate: true }
);

const containerTag = computed(() => props.containerTag);
</script>

<template>
    <component :is="containerTag">
        <HtmlNodeRender
            v-for="(n, i) in ast"
            :key="i"
            :node="n"
            :components-map="componentsMap"
        />
    </component>
</template>
