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
let expand = ref(true);

function saveSettings() {
    console.log(formData.value);
}

function navigateBack() {
    if (title.value != "") {
        title.value = "";
    } else {
        navigateTo("/");
    }
}
</script>

<template>
    <div class="dashboard">
        <div
            class="settings"
            :class="{
                expand: expand == true,
            }"
        >
            <div class="settings-info">
                <ElButton class="back" type="button" @click="navigateBack">
                    <Icon class="icon" :name="'fa7-solid:angle-left'" />
                </ElButton>
                <span class="info">
                    正在编辑:<br />
                    <h2>{{ title || "主题" }}</h2>
                </span>
                <div class="controls">
                    <ElButton class='button' type="button" @click="saveSettings">保存</ElButton>
                    <ElButton class="button" type="button" @click="expand = !expand">{{ expand ? '<<<' : '>>>' }}</ElButton>
                </div>
            </div>
            <div class="settings-form">
                <aside
                    class="settings-menu"
                    :class="{
                        show: title == '' || expand == true,
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
                        show: title != '' || expand == true,
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
                        <pre>{{ current }} {{ formData }}</pre>
                    </FormKit>
                </div>
            </div>
        </div>
        <iframe
            class="preview"
            src="/"
            frameborder="0"
            :class="{
                show: expand !== true,
            }"
        />
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
.settings.expand {
    width: 100dvw;
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
    max-width: 3rem;
}
.back .icon {
    transform: scale(1.5);
}
.settings-info .info {
    width: 100%;
}
.settings-info .controls {
    width: 5rem;
    display: flex;
    flex-direction: column;
}
.controls .button {
    width: 100%;
    margin: 0;
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
    overflow: auto;
}
.expand .settings-menu.show {
    max-width: 20dvw;
}
.settings-area.show {
    padding:3%;
}
:deep(.el-collapse-item__content) {
    padding: 0;
}
.preview {
    height: 100%;
    width: 0;
    flex: 1;
    transition: all 0.5s ease;
}
.preview.show {
    width: unset;
}
</style>
