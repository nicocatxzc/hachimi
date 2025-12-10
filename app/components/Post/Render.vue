<template>
    <HtmlRender
        :html="htmlContent"
        :components-map="componentsMap"
        container-tag="article"
    />
</template>

<script setup>
import CodeHighlight from "@/components/CodeHighlight.vue";
const { html } = defineProps({
    html: {
        type: String,
        required: true,
    },
});

const htmlContent = html ? html : "";

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
            return node.type === "tag" && node.name === "pre";
        },
        component: CodeHighlight,

        propsMapper(node) {
            // 查找<code>
            const codeNode = node.children?.find(
                (c) => c.type === "tag" && c.name === "code"
            );

            let codeText = "";
            let detectedLang = "auto";

            if (codeNode) {
                // 收集code内容
                codeText = codeNode.children
                    .filter((c) => c.type === "text")
                    .map((c) => c.text)
                    .join("");

                // 获取language
                const classText = codeNode.attrs?.class || "";
                const m = classText.match(/language-([\w-]+)/);
                if (m) {
                    detectedLang = m[1];
                }
            } else {
                // 没有code
                codeText = node.children
                    .filter((c) => c.type === "text")
                    .map((c) => c.text)
                    .join("");

                detectedLang = "auto";
            }

            // 传递code和lang
            return {
                code: codeText,
                lang: detectedLang,
                ...node.attrs
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
