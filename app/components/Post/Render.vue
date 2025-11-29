<!-- pages/PostRender.vue -->
<template>
    <HtmlRender
        :html="htmlContent"
        :components-map="componentsMap"
        container-tag="article"
    />
</template>

<script setup>
const { html } = defineProps({
    html: {
        type: String,
        required: true,
    },
});

const htmlContent = html ? html : "";

// 高亮组件占位
const CodeHighlighter = {
    props: ["class", "style", "node"],
    template: `<pre style="border:1px solid #ddd;padding:6px"><code><slot/></code></pre>`,
};

// swiper占位
const SwiperGallery = {
    props: ["node"],
    template: `<div style="border:1px dashed #555;padding:6px">[Swiper placeholder] <slot/></div>`,
};

const ShortcodeRenderer = {
    props: ["node", "attrs", "inner"],
    template: `<div style="border:1px solid #aaa;padding:6px">
    <strong>Shortcode:</strong>
    <div>attrs: {{ attrs }}</div>
    <div>inner: {{ inner }}</div>
    <slot/>
  </div>`,
};

/* componentsMap 规则：
 - conditions(node): 判断是否匹配
 - component: Vue 组件名称
 - propsMapper 传递给组件的数据
 - listenersMapper 事件映射
*/
const componentsMap = {
    // 高亮组件
    codeBlock: {
        conditions(node) {
            // 匹配标签
            return node.type === "tag" && node.name === "pre";
        },
        component: CodeHighlighter,
        propsMapper(node) {
            // 传入原始节点和class
            return {
                node,
                class: node.attrs?.class,
            };
        },
    },

    // 图库
    gallery: {
        conditions(node) {
            return (
                node.type === "tag" &&
                node.name === "div" &&
                (node.attrs?.class || "").includes("wp-block-gallery")
            );
        },
        component: SwiperGallery,
        propsMapper(node) {
            return { node };
        },
    },

    // 短代码解析
    shortcode: {
        conditions(node) {
            return (
                node.type === "text" &&
                node.text &&
                node.text.includes("[shortcode")
            );
        },
        component: ShortcodeRenderer,
        propsMapper(node) {
            const m = node.text.match(
                /\[shortcode\s*([^\]]*)\](.*?)\[\/shortcode\]/s
            );
            if (!m) return { node, attrs: {}, inner: node.text };
            const rawAttrs = m[1] || "";
            const inner = m[2] || "";
            const attrs = {};
            rawAttrs.replace(/(\w+)="([^"]*)"/g, (_, k, v) => (attrs[k] = v));
            return { node, attrs, inner };
        },
    },
};
</script>
