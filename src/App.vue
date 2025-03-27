<script setup lang="ts">
import { computed } from 'vue';
import { NConfigProvider, darkTheme } from 'naive-ui';
import type { WatermarkProps } from 'naive-ui';
import { useRouteStore } from '@/store/modules/route';
import { useAppStore } from './store/modules/app';
import { useThemeStore } from './store/modules/theme';
import { naiveDateLocales, naiveLocales } from './locales/naive';
/*
全局消息、对话框文档
*/
// import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui';
// window.$loadingBar = useLoadingBar();
//       window.$dialog = useDialog();
//       window.$message = useMessage();
//       window.$notification = useNotification();
/*
  tang 静态路由刷新时机 基础uri全局
*/
const routeStore = useRouteStore();
const invoke = async () => {
  console.log('initAuthRoute');
  await routeStore.initAuthRoute();
  // localStorage.setItem('baseUri', 'http://future.com:8080');
  localStorage.setItem('baseUri', 'http://localhost:8080');
};
invoke();
defineOptions({
  name: 'App'
});

const appStore = useAppStore();
const themeStore = useThemeStore();

const naiveDarkTheme = computed(() => (themeStore.darkMode ? darkTheme : undefined));

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale];
});

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale];
});

const watermarkProps = computed<WatermarkProps>(() => {
  return {
    content: themeStore.watermark.text,
    cross: true,
    fullscreen: true,
    fontSize: 16,
    lineHeight: 16,
    width: 384,
    height: 384,
    xOffset: 12,
    yOffset: 60,
    rotate: -15,
    zIndex: 9999
  };
});
</script>

<template>
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full"
  >
    <AppProvider>
      <RouterView class="bg-layout" />
      <NWatermark v-if="themeStore.watermark.visible" v-bind="watermarkProps" />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
