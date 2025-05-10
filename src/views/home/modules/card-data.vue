<script setup lang="ts">
import { computed, reactive } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import { c } from 'naive-ui';
import { $t } from '@/locales';
import { index } from '@/service/api/csams/home';
// async function getHomeData() {
//   const { data } = await index();
//   console.log(data);
// }
const counts = reactive({
  view_count: 0,
  participation_count: 0,
  activity_count: 0,
  user_count: 0
});
const getHomeData = async () => {
  const { data } = await index();
  // console.log(data);
  // 错误
  // counts = {data};
  // 一个一个赋值
  // const { view_count, participation_count, activity_count, user_count } = data;
  Object.assign(counts, data);
};
getHomeData();

defineOptions({
  name: 'CardData'
});

interface CardData {
  key: string;
  title: string;
  value: number;
  unit: string;
  color: {
    start: string;
    end: string;
  };
  icon: string;
}
// const visitCountValue =
const cardData = computed<CardData[]>(() => [
  {
    key: 'view_count',
    title: $t('page.home.visitCount'),
    value: counts.view_count,
    unit: '',
    color: {
      start: '#ec4786',
      end: '#b955a4'
    },
    icon: 'ant-design:bar-chart-outlined'
  },
  {
    key: 'participation_count',
    title: '参与人次',
    value: counts.participation_count,
    unit: '',
    color: {
      start: '#865ec0',
      end: '#5144b4'
    },
    icon: 'ant-design:bar-chart-outlined'
  },
  // {
  //   key: 'turnover',
  //   title: $t('page.home.turnover'),
  //   value: 1026,
  //   unit: '$',
  //   color: {
  //     start: '#865ec0',
  //     end: '#5144b4'
  //   },
  //   icon: 'ant-design:money-collect-outlined'
  // },
  {
    key: 'activity_count',
    title: '活动数量',
    value: counts.activity_count,
    unit: '',
    color: {
      start: '#56cdf3',
      end: '#719de3'
    },
    icon: 'ant-design:bar-chart-outlined'
  },
  // {
  //   key: 'downloadCount',
  //   title: $t('page.home.downloadCount'),
  //   value: 970925,
  //   unit: '',
  //   color: {
  //     start: '#56cdf3',
  //     end: '#719de3'
  //   },
  //   icon: 'carbon:document-download'
  // },
  {
    key: 'user_count',
    title: '用户数量',
    value: counts.user_count,
    unit: '',
    color: {
      start: '#fcbc25',
      end: '#f68057'
    },
    icon: 'ant-design:bar-chart-outlined'
  }
  // {
  //   key: 'dealCount',
  //   title: $t('page.home.dealCount'),
  //   value: 9527,
  //   unit: '',
  //   color: {
  //     start: '#fcbc25',
  //     end: '#f68057'
  //   },
  //   icon: 'ant-design:trademark-circle-outlined'
  // }
]);

interface GradientBgProps {
  gradientColor: string;
}

const [DefineGradientBg, GradientBg] = createReusableTemplate<GradientBgProps>();

function getGradientColor(color: CardData['color']) {
  return `linear-gradient(to bottom right, ${color.start}, ${color.end})`;
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <!-- define component start: GradientBg -->
    <DefineGradientBg v-slot="{ $slots, gradientColor }">
      <div class="rd-8px px-16px pb-4px pt-8px text-white" :style="{ backgroundImage: gradientColor }">
        <component :is="$slots.default" />
      </div>
    </DefineGradientBg>
    <!-- define component end: GradientBg -->

    <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
      <NGi v-for="item in cardData" :key="item.key">
        <GradientBg :gradient-color="getGradientColor(item.color)" class="flex-1">
          <h3 class="text-16px">{{ item.title }}</h3>
          <div class="flex justify-between pt-12px">
            <SvgIcon :icon="item.icon" class="text-32px" />
            <CountTo
              :prefix="item.unit"
              :start-value="1"
              :end-value="item.value"
              class="text-30px text-white dark:text-dark"
            />
          </div>
        </GradientBg>
      </NGi>
    </NGrid>
  </NCard>
</template>

<style scoped></style>
