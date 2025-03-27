<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

import { selectInfoClassList, selectInfoDepartmentList, selectInfoMajorList } from '@/service/api/csams/info';

import { insertOrUpdateClubMember, selectClubList, selectClubListWithApproved } from '@/service/api/csams/club';

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
    add: '新增社团人员',
    edit: '编辑社团人员'
  };
  return titles[props.operateType];
});

const model = ref(createDefaultModel());

function createDefaultModel() {
  return {
    approvalStatus: null,
    approveReason: '',
    clubId: null
  };
}

/*
      默认申请就是申请人
      */

// id?: number,
// joinTime?: Date,
// createTime?: Date,
// updateTime?: Date,
// approveTime?: Date,
// approverId?: number,
// userId?: number,
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
  delete model.value.userName;
  delete model.value.approverName;
  delete model.value.clubName;
  // request
  await insertOrUpdateClubMember(model.value);
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
// selectClubList().then(res => {
//   options.push(
//     ...res.data.map((item: any) => {
//       /*
//       审批未通过的社团不得申请 todo
//       */
//       if (item.approvalStatus === 1) {
//         // console.log(item.approvalStatus);
//         return {
//           label: item.name,
//           value: item.id
//         };
//       }
//     })
//   );
// });
selectClubListWithApproved().then(res => {
  options.push(
    ...res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.id
      };
    })
  );
});

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
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem label="社团">
          <NSelect v-model:value="model.clubId" :options="options" clearable />
        </NFormItem>
        <NFormItem v-if="isEdit" label="审批状态">
          <NSelect v-model:value="model.approvalStatus" :options="options2" clearable />
        </NFormItem>
        <NFormItem v-if="isEdit" label="审批原因">
          <NInput v-model:value="model.approveReason" type="textarea" />
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
