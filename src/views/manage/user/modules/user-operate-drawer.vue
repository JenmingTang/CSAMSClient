<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchGetAllRoles } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import {
  insertOrUpdateUser,
  selectRoleIdListByUserId,
  selectRoleList,
  updateUserRoleByUserIdAndRoleIds
} from '@/service/api/csams/sys';
defineOptions({
  name: 'UserOperateDrawer'
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
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.user.addUser'),
    edit: $t('page.manage.user.editUser')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Sys.User, 'enabled'>;

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    // userName: '',
    // userGender: null,
    // nickName: '',
    // userPhone: '',
    // userEmail: '',
    // userRoles: [],
    // status: null
    enabled: null
  };
}

type RuleKey = Extract<keyof Model, 'userName' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  userName: defaultRequiredRule,
  status: defaultRequiredRule
};

/** the enabled role options */
const roleOptions = ref<CommonType.Option<string>[]>([]);

async function getRoleOptions() {
  const { error, data } = await fetchGetAllRoles();

  if (!error) {
    const options = data.map(item => ({
      label: item.roleName,
      value: item.roleCode
    }));

    // the mock data does not have the roleCode, so fill it
    // if the real request, remove the following code
    const userRoleOptions = model.value.userRoles.map(item => ({
      label: item,
      value: item
    }));
    // end

    roleOptions.value = [...userRoleOptions, ...options];
  }
}

function handleInitModel() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model.value, props.rowData);
  }

  /*
  编辑或新建对象
  两者都能拿到对应条目数据
  */

  // console.log(props.rowData);
  // console.log(model.value);
}

function closeDrawer() {
  visible.value = false;
}

// tang

const roleId = computed(() => props.rowData?.id || -1);
const isEdit = computed(() => props.operateType === 'edit');

const userRoles2 = ref([]);
async function handleSubmit() {
  // await validate();
  await updateUserRoleByUserIdAndRoleIds(roleId.value, userRoles2.value);
  await insertOrUpdateUser(model.value);
  // request
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

/*
tang 处理角色
*/

const options = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '禁用',
    value: 0
  }
];

const roleOptions2 = ref([
  // {
  //   label: '启用',
  //   value: 1
  // },
]);
const start = async () => {
  roleOptions2.value = [];
  userRoles2.value = [];
  // console.log('start');
  // console.log(roleId);
  const { data, code, msg } = await selectRoleList();
  const resp2 = await selectRoleIdListByUserId(roleId.value);
  // console.log(resp);
  data.forEach(item => {
    roleOptions2.value.push({
      label: item.description,
      value: item.id
    });
  });
  resp2.data.forEach(item => {
    userRoles2.value.push(item);
  });
};
watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    // getRoleOptions();
    /*
    tang 处理角色
    */
    start();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.user.userStatus')" path="status">
          <NRadioGroup v-model:value="model.enabled">
            <NRadio v-for="item in options" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.userRole')" path="roles">
          <!-- roleId拿到当前id -->
          <NSelect
            v-model:value="userRoles2"
            multiple
            :options="roleOptions2"
            :placeholder="$t('page.manage.user.form.userRole')"
          />
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
