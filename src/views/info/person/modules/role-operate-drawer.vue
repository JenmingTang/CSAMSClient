<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

import { selectInfoClassList, selectInfoDepartmentList, selectInfoMajorList } from '@/service/api/csams/info';

import { insertOrUpdateUser } from '@/service/api/csams/sys';

defineOptions({
  name: 'RoleOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Sys.User | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增人员',
    edit: '编辑人员'
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Sys.User, 'realName' | 'college' | 'major' | 'userClass' | 'phone' | 'email' | 'avatarUrl'>;

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    realName: '',
    college: '',
    major: '',
    userClass: '',
    phone: '',
    email: ''
  };
}

const roleId = computed(() => props.rowData?.id || -1);

const isEdit = computed(() => props.operateType === 'edit');

function handleInitModel() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model.value, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // console.log('model: ', model.value);
  delete model.value.index;
  delete model.value.password;
  // request
  await insertOrUpdateUser(model.value);
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});

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
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem label="姓名">
          <NInput v-model:value="model.realName" />
        </NFormItem>
        <NFormItem label="部门">
          <NSelect v-model:value="model.college" :options="options" clearable />
        </NFormItem>
        <NFormItem label="专业">
          <NSelect v-model:value="model.major" :options="options2" clearable />
        </NFormItem>
        <NFormItem label="班级">
          <NSelect v-model:value="model.userClass" :options="options3" clearable />
        </NFormItem>
        <NFormItem label="手机">
          <NInput v-model:value="model.phone" />
        </NFormItem>
        <NFormItem label="邮箱">
          <NInput v-model:value="model.email" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
