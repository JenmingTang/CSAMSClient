<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { insertOrUpdateActivityMember, selectActivityListWithApproved } from '@/service/api/csams/activity';

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
    add: '新增活动成员',
    edit: '编辑活动成员'
  };
  return titles[props.operateType];
});

const model = ref(createDefaultModel());
/*
tang
*/
function createDefaultModel() {
  return {
    activityId: null,
    approvalStatus: null,
    approveReason: ''
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
  /*
  tang
  */
  // console.log('model: ', model.value);
  delete model.value.index;
  delete model.value.userName;
  delete model.value.activityName;
  delete model.value.approverName;
  // request
  await insertOrUpdateActivityMember(model.value);
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
const options2 = [
  {
    label: '待审批',
    value: 0
  },
  {
    label: '审批通过',
    value: 1
  },
  {
    label: '审批拒绝',
    value: 2
  }
];
selectActivityListWithApproved().then(res => {
  options.push(
    ...res.data.map((item: any) => {
      return {
        label: item.title,
        value: item.id
      };
    })
  );
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem v-if="!isEdit" label="所属活动">
          <NSelect v-model:value="model.activityId" :options="options" clearable />
        </NFormItem>

        <!--
 <NFormItem label="内容">
          <NInput v-model:value="model.content" type="textarea" />
        </NFormItem>
-->
        <!--
 <NFormItem label="加入时间">
          <NDatePicker v-model:value="model.joinTime" type="datetime" clearable />
        </NFormItem>
-->
        <!-- tang -->
        <!--
 <NFormItem v-if="!isEdit" label="审批人">
          <NSelect v-model:value="model.approverId" :options="options" clearable />
        </NFormItem>
-->
        <NFormItem v-if="isEdit" label="审批状态">
          <NSelect v-model:value="model.approvalStatus" :options="options2" clearable />
        </NFormItem>

        <NFormItem v-if="isEdit" label="审批原因">
          <NInput v-model:value="model.approveReason" type="textarea" />
        </NFormItem>
        <!--
 <NFormItem v-if="isEdit" label="审批时间">
          <NDatePicker v-model:value="model.approveTime" type="datetime" clearable />
        </NFormItem>
-->
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
