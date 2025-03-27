<script setup lang="ts">
import { computed, ref } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

import { useAuth } from '@/hooks/business/auth';
const { hasAuth } = useAuth();
defineOptions({
  name: 'UserSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Sys.UserSearchParams>('model', { required: true });
// tang 测试时间 字符串和时间戳都得
// 组件返回的是时间戳
// model.value.createTimeStart = '2025-03-04 22:50:56';
// model.value.createTimeEnd = '2025-03-04 23:50:56';
type RuleKey = Extract<keyof Api.SystemManage.UserSearchParams, 'userEmail' | 'userPhone'>;

const rules = computed<Record<RuleKey, App.Global.FormRule>>(() => {
  const { patternRules } = useFormRules(); // inside computed to make locale reactive

  return {
    userEmail: patternRules.email,
    userPhone: patternRules.phone
  };
});

/*
必须嘚初始化才得
*/
const range = ref<[number, number]>([1183135260000, Date.now()]);
async function reset() {
  range.value = [1183135260000, Date.now()];
  await restoreValidation();
  emit('reset');
}
async function search() {
  // model.value.createTimeStart = range.value[0];
  // model.value.createTimeEnd = range.value[1];
  await validate();
  emit('search');
}
const options = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '禁用',
    value: 0
  },
  {
    label: '未选中',
    value: 2,
    disabled: true
  }
];
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="user-search">
        <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userName')" path="username" class="pr-24px">
              <NInput v-model:value="model.username" :placeholder="$t('page.manage.user.form.userName')" />
            </NFormItemGi>
            <!--
 <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.manage.user.userGender')"
              path="userGender"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.userGender"
                :placeholder="$t('page.manage.user.form.userGender')"
                :options="translateOptions(userGenderOptions)"
                clearable
              />
            </NFormItemGi>
-->
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userStatus')" path="enabled" class="pr-24px">
              <!-- :options="translateOptions(enableStatusOptions)" -->
              <NSelect
                v-model:value="model.enabled"
                :placeholder="$t('page.manage.user.form.userStatus')"
                :options="options"
                clearable
              />
            </NFormItemGi>

            <NFormItemGi span="24 s:12 m:6" label="创建时间开始" path="status" class="pr-24px">
              <NDatePicker v-model:value="model.createTimeStart" type="datetime" clearable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="创建时间结束" path="status" class="pr-24px">
              <NDatePicker v-model:value="model.createTimeEnd" type="datetime" clearable />
            </NFormItemGi>

            <!--
 <NFormItemGi span="24 s:12 m:6" label="创建时间" path="status" class="pr-24px">
              <NDatePicker v-model:value="range" type="datetimerange" clearable />
            </NFormItemGi> 
-->

            <NFormItemGi span="24 m:12" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton v-if="hasAuth('BUTTON_SEARCH_USER')" type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
