import "element-plus/dist/index.css";
import "vue-color/style.css";
import {
    elText,
    elTextarea,
    CodeEditor,
    elSelect,
    elCheckbox,
    elCheckboxGroup,
    elColorPicker,
    elRadioGroup,
    elSlider,
    elSwitch,
    SortableList
} from "./inputs/index";

export default [
    {
        key: "basic",
        title: "基础设置",
        subGroup: [
            {
                key: "word",
                title: "文字类",
                schema: [
                    {
                        $formkit: elText,
                        name: "singleLine",
                        label: "单行文本",
                        value: "默认单行文本",
                        placeholder: "请输入单行文本内容",
                    },

                    {
                        $formkit: elTextarea,
                        name: "multiLine",
                        label: "多行文本",
                        value: "默认多行文本",
                        props: { rows: 4 },
                    },

                    {
                        $formkit: CodeEditor,
                        name: "code",
                        label: "代码",
                        value: "<div></div>",
                        language: "html",
                    },
                ],
            },
            {
                key: "select",
                title: "选项类",
                schema: [
                    {
                        $formkit: elRadioGroup,
                        name: "singleChoice",
                        label: "单选",
                        value: "A",
                        options: [
                            { label: "选项 A", value: "A" },
                            { label: "选项 B", value: "B" },
                        ],
                    },

                    {
                        $formkit: elCheckboxGroup,
                        name: "multiChoice",
                        label: "多选",
                        value: ["1", "3"],
                        options: [
                            { label: "选项 1", value: "1" },
                            { label: "选项 2", value: "2" },
                            { label: "选项 3", value: "3" },
                        ],
                    },

                    {
                        $formkit: elSwitch,
                        name: "switch",
                        label: "开关",
                        value: false,
                    },

                    {
                        $formkit: elSelect,
                        name: "dropdown",
                        label: "下拉菜单",
                        value: "Y",
                        options: [
                            { label: "下拉选项 X", value: "X" },
                            { label: "下拉选项 Y", value: "Y" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        key: "number",
        title: "数值类",
        schema: [
            {
                $formkit: elSlider,
                name: "slider",
                label: "滑块",
                value: 30,
                min: 0,
                max: 100,
                step: 0.1,
                props: {
                    showInput: true,
                },
            },
        ],
    },
    {
        key: "advanced",
        title: "高级设置",
        schema: [
            {
                $formkit: elColorPicker,
                name: "colorPicker",
                label: "调色板",
                value: "#FFFFFF",
            },
            {
                $el: "div",
                attrs: {
                    innerHTML: "<b>原生</b> HTML 提示信息",
                },
            },
            {
                $formkit: "list",
                name: "items",
                label: "配置项列表",
                children: [
                    {
                        $formkit: "group",
                        children: [
                            { $formkit: elText, name: "title", label: "标题" },
                            { $formkit: elSelect, name: "type", label: "类型" },
                            {
                                $formkit: elSlider,
                                name: "weight",
                                label: "权重",
                            },
                        ],
                    },
                ],
            },
            {
                $formkit: SortableList,
                name: "features",
                label: "功能列表",
                innerSchema: [
                    {
                        $formkit: elText,
                        name: "title",
                        label: "标题",
                    },
                    {
                        $formkit: elSlider,
                        name: "weight",
                        label: "权重",
                        min: 0,
                        max: 100,
                    },
                    {
                        $formkit: elSwitch,
                        name: "enabled",
                        label: "启用",
                    },
                ],
            },
        ],
    },
];
