<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';
import { selectInfoDepartmentList } from '@/service/api/csams/info';

import { useAuth } from '@/hooks/business/auth';
const { hasAuth } = useAuth();

defineOptions({
  name: 'RoleSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.Info.InfoMajorSearchParams>('model', { required: true });
const range = ref<[number, number]>([1183135260000, Date.now()]);
function reset() {
  range.value = [1183135260000, Date.now()];
  emit('reset');
}

function search() {
  // model.value.createTimeStart = range.value[0];
  // model.value.createTimeEnd = range.value[1];
  emit('search');
}
const options = ref([]);
async function init() {
  const res = await selectInfoDepartmentList();
  options.value = res.data.map(item => ({
    label: item.name,
    value: item.id
  }));
}
init();
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :default-expanded-names="['role-search']">
      <NCollapseItem :title="$t('common.search')" name="role-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="所属部门" path="roleName" class="pr-24px">
              <NSelect v-model:value="model.departmentId" filterable placeholder="所属部门" :options="options" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="专业名称" path="roleCode" class="pr-24px">
              <NInput v-model:value="model.name" placeholder="专业名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="专业编码" path="roleCode" class="pr-24px">
              <NInput v-model:value="model.code" placeholder="专业名称" />
            </NFormItemGi>
            <!--
 <NFormItemGi span="24 s:12 m:6" label="专业描述" path="roleCode" class="pr-24px">
              <NInput v-model:value="model.description" placeholder="专业描述" />
            </NFormItemGi> 
-->

            <!--
 <NFormItemGi span="24 s:12 m:6" label="创建时间" path="status" class="pr-24px">
              <NDatePicker v-model:value="range" type="datetimerange" clearable />
            </NFormItemGi>
-->

            <NFormItemGi span="24 s:12 m:6" label="创建时间开始" path="status" class="pr-24px">
              <NDatePicker v-model:value="model.createTimeStart" type="datetime" clearable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="创建时间结束" path="status" class="pr-24px">
              <NDatePicker v-model:value="model.createTimeEnd" type="datetime" clearable />
            </NFormItemGi>

            <NFormItemGi span="24 s:12 m:6">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton v-if="hasAuth('BUTTON_SEARCH_MAJOR')" type="primary" ghost @click="search">
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
