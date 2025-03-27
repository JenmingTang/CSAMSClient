<script setup lang="ts">
import { $t } from '@/locales';

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

const model = defineModel<Api.Club.ClubSearchParams>('model', { required: true });

function reset() {
  model.value.createTimeRange = null;
  model.value.createTimeStart = null;
  model.value.createTimeEnd = null;
  // or delete model.value.createTimeRange;
  emit('reset');
}

function search() {
  if (model.value.createTimeRange) {
    model.value.createTimeStart = model.value.createTimeRange[0];
    model.value.createTimeEnd = model.value.createTimeRange[1];
    delete model.value.createTimeRange;
  }
  emit('search');
}

const options = [
  {
    label: '待审批',
    value: '0'
  },
  {
    label: '审批通过',
    value: '1'
  },
  {
    label: '审批拒绝',
    value: '2'
  }
];
// selectInfoDepartmentList().then(res => {
//   options.push(
//     ...res.data.map((item: any) => {
//       return {
//         label: item.name,
//         value: item.name
//       };
//     })
//   );
// });
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :default-expanded-names="['role-search']">
      <NCollapseItem :title="$t('common.search')" name="role-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="地点" path="realName" class="pr-24px">
              <NInput v-model:value="model.name" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="审批状态" path="enabled" class="pr-24px">
              <NSelect v-model:value="model.approvalStatus" :options="options" clearable />
            </NFormItemGi>

            <NFormItemGi span="24 s:12 m:6" label="创建时间" path="status" class="pr-24px">
              <NDatePicker v-model:value="model.createTimeRange" type="datetimerange" clearable />
            </NFormItemGi>

            <NFormItemGi span="24 s:12 m:6">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton v-if="hasAuth('BUTTON_SEARCH_ACTIVITY_LOCATION')" type="primary" ghost @click="search">
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
