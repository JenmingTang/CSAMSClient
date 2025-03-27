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

const model = defineModel<Api.Sys.UserSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
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
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :default-expanded-names="['role-search']">
      <NCollapseItem :title="$t('common.search')" name="role-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="成员姓名" path="realName" class="pr-24px">
              <NInput v-model:value="model.userName" />
            </NFormItemGi>

            <NFormItemGi span="24 s:12 m:6" label="社团名称" path="realName" class="pr-24px">
              <NInput v-model:value="model.clubName" />
            </NFormItemGi>

            <NFormItemGi span="24 s:12 m:6" label="审批人" path="realName" class="pr-24px">
              <NInput v-model:value="model.approverName" />
            </NFormItemGi>

            <NFormItemGi span="24 s:12 m:6" label="审批状态" path="enabled" class="pr-24px">
              <NSelect v-model:value="model.approvalStatus" :options="options" clearable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton v-if="hasAuth('BUTTON_SEARCH_CLUB_MEMBER')" type="primary" ghost @click="search">
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
