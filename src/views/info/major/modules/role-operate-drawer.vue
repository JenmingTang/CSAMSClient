<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useBoolean } from '@sa/hooks';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import { insertOrUpdateInfoMajor, selectInfoDepartmentList } from '@/service/api/csams/info';

defineOptions({
  name: 'RoleOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Info.InfoMajor | null;
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
    add: '新增专业',
    edit: '编辑专业'
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Info.InfoMajor, 'departmentId' | 'code' | 'name' | 'description'>;

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    departmentId: null,
    code: '',
    name: '',
    description: ''
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
  // request
  delete model.value.index;
  delete model.value.departmentName;
  await insertOrUpdateInfoMajor(model.value);
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
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem label="所属部门" path="roleName">
          <NSelect v-model:value="model.departmentId" filterable placeholder="所属部门" :options="options" />
        </NFormItem>
        <NFormItem label="专业名称" path="roleName">
          <NInput v-model:value="model.name" placeholder="专业名称" />
        </NFormItem>
        <NFormItem label="专业代码" path="roleCode">
          <NInput v-model:value="model.code" placeholder="专业代码" />
        </NFormItem>
        <NFormItem label="专业描述" path="roleDesc">
          <NInput v-model:value="model.description" placeholder="专业描述" type="textarea" />
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
