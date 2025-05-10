<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { UploadFileInfo } from 'naive-ui';
import { useNaiveForm } from '@/hooks/common/form';
import { deleteLocalFileById, selectLocalFileListByParams } from '@/service/api/csams/file';
import { $t } from '@/locales';
/*
tang
*/

import { insertOrUpdateClub } from '@/service/api/csams/club';

import { useAuth } from '@/hooks/business/auth';

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
    add: '新增社团',
    edit: '编辑社团'
  };
  return titles[props.operateType];
});

const model = ref(createDefaultModel());
/*
tang
*/
function createDefaultModel() {
  return {
    name: '',
    description: '',
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
  // console.log('model: ', model.value);
  delete model.value.index;
  if (model.value.name === '' || model.value.description === '') {
    window.$message?.error('社团名称和社团描述不能为空！');
    return;
  }
  // request
  await insertOrUpdateClub(model.value);
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

/*
file
*/ const token = `${String(localStorage.getItem('SOY_token')).trim().replace(/"/g, '')}`;

const baseUri = localStorage.getItem('baseUri');
const uploadUrl = `${baseUri}/upload`;
const imageFileList = ref<UploadFileInfo[]>([]);
const imageFileList2 = ref<UploadFileInfo[]>([]);
const imageFileList3 = ref<UploadFileInfo[]>([]);
const imageFileList4 = ref<UploadFileInfo[]>([]);
/*
const静态不行，因为切换条目id要根据roleId.value更新
*/
const uploadParams = computed(() => ({
  targetId: roleId.value,
  targetType: 1,
  fileCategory: 1
}));
const uploadParams2 = computed(() => ({
  targetId: roleId.value,
  targetType: 1,
  fileCategory: 2
}));
const uploadParams3 = computed(() => ({
  targetId: roleId.value,
  targetType: 1,
  fileCategory: 3
}));
const uploadParams4 = computed(() => ({
  targetId: roleId.value,
  targetType: 1,
  fileCategory: 4
}));
const onRemove = async (options: { file: UploadFileInfo; fileList: Array<UploadFileInfo>; index: number }) => {
  const res = await deleteLocalFileById(options.file.id);
  const { code, data, msg } = res.response.data;
  if (code === 200) {
    window.$message?.success?.(msg);
    return true;
  }
  if (code !== 200) {
    window.$message?.error?.(msg);
    return false;
  }
  window.$message?.error?.('前端删除文件错误，请联系管理员！');
  return false;
};

const initFileList = () => {
  imageFileList.value = [];
  imageFileList2.value = [];
  imageFileList3.value = [];
  imageFileList4.value = [];
};
const selectLocalFileListByParamsAgain = () => {
  selectLocalFileListByParams({
    targetId: roleId.value
  }).then(res => {
    const safeData = Array.isArray(res.data) ? res.data : [];
    safeData.forEach(item => {
      const fileItem = {
        id: item.id,
        name: item.fileName, // 确认字段名是否匹配
        status: 'finished',
        url: `${baseUri}/${item.fileUri}` // 确保 baseUri 已定义
      };

      switch (item.fileCategory) {
        case 1:
          imageFileList.value.push(fileItem);
          break;
        case 2:
          imageFileList2.value.push(fileItem);
          break;
        case 3:
          imageFileList3.value.push(fileItem);
          break;
        case 4:
          imageFileList4.value.push(fileItem);
          break;
        default:
          console.warn(`Unknown file category: ${item.fileCategory}`);
      }
    });
  });
};
const onFinish = ({ file }) => {
  setTimeout(() => {
    initFileList();
    selectLocalFileListByParamsAgain();
  }, 500);
  return file;
};

function downloadFile(url, name) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank'; // 在新标签页中打开
  anchor.download = name; // 强制下载
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
const onDownload = (file: FileInfo) => {
  downloadFile(file.url, file.name);
  return false;
};
watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    /*
    打开才触发
    */
    setTimeout(() => {
      initFileList();
      selectLocalFileListByParamsAgain();
    }, 500);
  }
  /*
  打开和关闭都触发
  */
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
const toPressFn = () => {
  window.open('https://uutool.cn/tinymce/', '_blank');
};
const { hasAuth } = useAuth();
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem label="社团名称">
          <NInput v-model:value="model.name" />
        </NFormItem>
        <NFormItem label="社团描述">
          <NInput v-model:value="model.description" type="textarea" />
        </NFormItem>

        <NFormItem v-if="isEdit" label="图片">
          <!-- @on-remove 并不生效？ -->
          <NUpload
            v-model:file-list="imageFileList"
            :action="uploadUrl"
            :data="uploadParams"
            list-type="image-card"
            :show-download-button="true"
            :max="9"
            name="file"
            :multiple="true"
            accept=".jpg,.jpeg,.png"
            :headers="{ Authorization: `Bearer ${token}` }"
            :on-finish="onFinish"
            :on-remove="onRemove"
            :on-download="onDownload"
          >
            <NButton>点击上传</NButton>
          </NUpload>
        </NFormItem>

        <NFormItem v-if="isEdit" label="附件">
          <!--
          @不触发
            @on-finish="onFinish"
          -->
          <NUpload
            v-model:file-list="imageFileList2"
            :action="uploadUrl"
            :data="uploadParams2"
            :show-download-button="true"
            :max="9"
            name="file"
            :multiple="true"
            accept=".et,.wps,.dps,.txt,.pdf,.docx,.doc,.xlsx,.xls,.csv,.pptx,.ppt,.rar,.zip,.7z,.tar,.gz"
            :headers="{ Authorization: `Bearer ${token}` }"
            :on-finish="onFinish"
            :on-remove="onRemove"
            :on-download="onDownload"
          >
            <NButton>点击上传</NButton>
          </NUpload>
        </NFormItem>

        <NFormItem v-if="isEdit" label="新闻稿编写工具">
          <NButton type="primary" dashed @click="toPressFn">点击访问</NButton>
        </NFormItem>
        <NFormItem v-if="isEdit" label="新闻稿">
          <NUpload
            v-model:file-list="imageFileList3"
            :action="uploadUrl"
            :data="uploadParams3"
            :show-download-button="true"
            :max="9"
            name="file"
            :multiple="true"
            accept=".html,.htm"
            :headers="{ Authorization: `Bearer ${token}` }"
            :on-remove="onRemove"
            :on-finish="onFinish"
            :on-download="onDownload"
          >
            <NButton>点击上传</NButton>
          </NUpload>
        </NFormItem>
        <NFormItem v-if="isEdit" label="展示新闻稿">
          <NUpload
            v-model:file-list="imageFileList4"
            :action="uploadUrl"
            :data="uploadParams4"
            :show-download-button="true"
            :max="1"
            name="file"
            :multiple="true"
            accept=".html,.htm"
            :headers="{ Authorization: `Bearer ${token}` }"
            :on-remove="onRemove"
            :on-finish="onFinish"
            :on-download="onDownload"
          >
            <NButton>点击上传</NButton>
          </NUpload>
        </NFormItem>
        <!-- tang -->
        <!--
 <NFormItem v-if="!isEdit" label="审批人">
          <NSelect v-model:value="model.approverId" :options="options" clearable />
        </NFormItem>
-->
        <NFormItem v-if="isEdit && hasAuth('BUTTON_APPROVE_CLUB')" label="审批状态">
          <NSelect v-model:value="model.approvalStatus" :options="options2" clearable />
        </NFormItem>

        <NFormItem v-if="isEdit && hasAuth('BUTTON_APPROVE_CLUB')" label="审批原因">
          <NInput v-model:value="model.approveReason" type="textarea" />
        </NFormItem>
        <!--
 <NFormItem v-if="isEdit" label="审批时间">
          <NInput v-model:value="model.approveReason" />
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
