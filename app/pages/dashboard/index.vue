<script setup>
import formSchema from "@/formkit/config";
import { useThemeSettingsStore } from "#imports";
definePageMeta({
    layout: false,
});
const themeSettings = useThemeSettingsStore();
const formData = ref(themeSettings.settings); // 表单数据
const groups = formSchema;
let current = ref("word");
let title = ref("");

function saveSettings() {
    console.log(formData.value);
}

function navigateBack() {
    if(title.value !='') {
        title.value = '';
    } else {
        navigateTo("/")
    }
}
</script>

<template>
    <div class="dashboard">
        <div class="settings">
            <div class="settings-info">
                <button class="back" type="button" @click="navigateBack">
                    <Icon :name="'fa7-solid:angle-left'" />
                </button>
                <span class="info">
                    正在编辑:<br />
                    <h2>{{ title || "主题" }}</h2>
                </span>
            </div>
            <div class="settings-form">
                <aside
                    class="settings-menu"
                    :class="{
                        show: title == '',
                    }"
                >
                    <ElMenu
                        class="navigate"
                        :default-active="current"
                        unique-opened
                        @select="
                            (key) => {
                                showForm = true;
                                current = key;
                            }
                        "
                    >
                        <template v-for="group in groups" :key="group.key">
                            <!-- 有子分组 -->
                            <ElSubMenu v-if="group.subGroup" :index="group.key">
                                <template #title>
                                    {{ group.title }}
                                </template>

                                <ElMenuItem
                                    v-for="sub in group.subGroup"
                                    :key="sub.key"
                                    :index="sub.key"
                                    @click="title = sub.title"
                                >
                                    {{ sub.title }}
                                </ElMenuItem>
                            </ElSubMenu>

                            <!-- 无子分组 -->
                            <ElMenuItem
                                v-else
                                :index="group.key"
                                @click="title = group.title"
                            >
                                {{ group.title }}
                            </ElMenuItem>
                        </template>
                    </ElMenu>
                </aside>
                <div
                    class="settings-area"
                    :class="{
                        show: title != '',
                    }"
                >
                    <FormKit v-model="formData" type="form" :actions="false">
                        <template v-for="group in groups" :key="group.key">
                            <!-- 顶层 -->
                            <div
                                v-if="group.schema"
                                v-show="current === group.key"
                            >
                                <FormKitSchema :schema="group.schema" />
                            </div>

                            <!-- 子分组 -->
                            <template v-if="group.subGroup">
                                <div
                                    v-for="sub in group.subGroup"
                                    v-show="current === sub.key"
                                    :key="sub.key"
                                >
                                    <FormKitSchema :schema="sub.schema" />
                                </div>
                            </template>
                        </template>
                        <button type="button" @click="saveSettings">
                            保存
                        </button>
                        <pre>{{ current }} {{ formData }}</pre>
                    </FormKit>
                </div>
            </div>
        </div>
        <iframe class="preview" src="/" frameborder="0" />
    </div>
</template>

<style scoped>
.dashboard {
    display: flex;
    height: 100dvh;
    width: 100dvw;
}
.settings {
    height: 100%;
    width: 20%;

    display: flex;
    flex-direction: column;
    position: relative;
    background-color: whitesmoke;
}
.settings-info {
    height: 4.5rem;
    top: 0;
    display: flex;
    position: sticky;
}
.settings-info .back {
    height: 100%;
    width: 3rem;
}
.settings-form {
    display: flex;
    height: 100%;
    overflow: auto;
}
.settings-menu,
.settings-area {
    width: 0;
    overflow: hidden;
    transition: all 0.5s ease;
}
.settings-menu.show,
.settings-area.show {
    width: 100%;
}
:deep(.el-collapse-item__content) {
    padding: 0;
}
.preview {
    height: 100%;
    flex: 1;
}
</style>
