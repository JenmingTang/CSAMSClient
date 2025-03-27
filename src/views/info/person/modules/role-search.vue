<script setup lang="ts">
import { $t } from '@/locales';
import { selectInfoClassList, selectInfoDepartmentList, selectInfoMajorList } from '@/service/api/csams/info';

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

const options = [];
const options2 = [];
const options3 = [];
selectInfoDepartmentList().then(res => {
  options.push(
    ...res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.name
      };
    })
  );
});
selectInfoMajorList().then(res => {
  options2.push(
    ...res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.name
      };
    })
  );
});
selectInfoClassList().then(res => {
  options3.push(
    ...res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.name
      };
    })
  );
});
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :default-expanded-names="['role-search']">
      <NCollapseItem :title="$t('common.search')" name="role-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="姓名" path="realName" class="pr-24px">
              <NInput v-model:value="model.realName" placeholder="请输入姓名" />
            </NFormItemGi>

            <NFormItemGi span="24 s:12 m:6" label="部门" path="status" class="pr-24px">
              <NSelect v-model:value="model.college" placeholder="请选择部门" :options="options" clearable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="专业" path="status" class="pr-24px">
              <NSelect v-model:value="model.major" placeholder="请选择专业" :options="options2" clearable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="班级" path="status" class="pr-24px">
              <NSelect v-model:value="model.userClass" placeholder="请选择班级" :options="options3" clearable />
            </NFormItemGi>

            <NFormItemGi span="24 s:12 m:6" label="手机号" path="phone" class="pr-24px">
              <NInput v-model:value="model.phone" placeholder="请输入手机号" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="邮箱" path="email" class="pr-24px">
              <NInput v-model:value="model.email" placeholder="请输入邮箱" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton v-if="hasAuth('BUTTON_SEARCH_PERSON')" type="primary" ghost @click="search">
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
