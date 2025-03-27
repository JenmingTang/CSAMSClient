<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { UploadFileInfo } from 'naive-ui';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { insertOrUpdateActivityLocation } from '@/service/api/csams/activity';
import { deleteLocalFileById, selectLocalFileListByParams } from '@/service/api/csams/file';

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
    add: '新增活动地点',
    edit: '编辑活动地点'
  };
  return titles[props.operateType];
});

const model = ref(createDefaultModel());
/*
tang
*/
function createDefaultModel() {
  return {
    name: null,
    description: null,
    approvalStatus: null,
    approveReason: null
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
  delete model.value.approverName;
  // request
  await insertOrUpdateActivityLocation(model.value);
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
/*
const静态不行，因为切换条目id要根据roleId.value更新
*/
const uploadParams = computed(() => ({
  targetId: roleId.value,
  targetType: 3,
  fileCategory: 1
}));
const onRemove = async (options: { file: UploadFileInfo; fileList: Array<UploadFileInfo>; index: number }) => {
  console.log('options: ', options);
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
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem label="地点">
          <NInput v-model:value="model.name" />
        </NFormItem>
        <NFormItem label="描述">
          <NInput v-model:value="model.description" />
        </NFormItem>
        <NFormItem label="图片">
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
            :on-remove="onRemove"
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
