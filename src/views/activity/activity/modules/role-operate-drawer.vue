<script setup lang="ts">
import { computed, defineComponent, h, ref, watch } from 'vue';

import type { UploadFileInfo } from 'naive-ui';
import { NAvatar, NButton, useMessage, useNotification } from 'naive-ui';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import {
  insertOrUpdateActivity,
  selectActivityLocationList,
  selectActivityLocationListWithApproved
} from '@/service/api/csams/activity';
import { deleteLocalFileById, selectLocalFileListByParams } from '@/service/api/csams/file';
import { selectClubListWithApproved } from '@/service/api/csams/club';

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
    add: '新增活动',
    edit: '编辑活动'
  };
  return titles[props.operateType];
});

const model = ref(createDefaultModel());
/*
tang
*/
function createDefaultModel() {
  return {
    clubId: null,
    title: '',
    content: '',
    location: '',
    startTime: null,
    endTime: null,
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
function handleClick2(title: string, content: string) {
  let markAsRead = false;
  const n = window.$notification?.create({
    title,
    content,
    // meta: `${Date.now()}`,
    action: () =>
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          onClick: () => {
            markAsRead = true;
            n.destroy();
          }
        },
        {
          default: () => '已读'
        }
      ),
    onClose: () => {
      if (!markAsRead) {
        window.$message?.warning('请设为已读');
        return false;
      }
    }
  });
}
async function handleSubmit() {
  await validate();
  /*
  tang
  */
  // console.log('model: ', model.value);
  delete model.value.index;
  delete model.value.clubName;
  delete model.value.approverName;
  // request
  const res = await insertOrUpdateActivity(model.value);
  console.log('res: ', res);
  if (res.data === true) {
    window.$message?.success($t('common.updateSuccess'));
  } else {
    let content = '';
    res.data.forEach(x => {
      content += `${x.location} ( ${x.startTime} - ${x.endTime} )\n`;
    });
    // handleClick2('活动场地使用冲突，请绕开！', JSON.stringify(res.data));
    handleClick2('活动场地使用冲突，请绕开！', content);
  }
  closeDrawer();
  emit('submitted');
}
/*
file文件
*/

/*
public enum TargetTypeEnum {
    USER(0, "用户"),
    CLUB(1, "社团"),
    ACTIVITY(2, "活动"),
    LOCATION(3, "活动地点");
public enum FileCategoryEnum {
    AVATAR(0, "头像"),
    IMAGE(1, "图片"),
    ATTACHMENT(2, "附件"),
    PRESS_RELEASE(3, "新闻稿");
*/
const token = `${String(localStorage.getItem('SOY_token')).trim().replace(/"/g, '')}`;

const baseUri = localStorage.getItem('baseUri');
const imageFileList = ref<UploadFileInfo[]>([]); // 明确类型 + 空数组初始
const imageFileList2 = ref<UploadFileInfo[]>([]); // 明确类型 + 空数组初始
const imageFileList3 = ref<UploadFileInfo[]>([]); // 明确类型 + 空数组初始
const imageFileList4 = ref<UploadFileInfo[]>([]); // 明确类型 + 空数组初始
/*
baseUri不会动态内存中修改，故computed可以不考虑
*/
// const uploadUrl = computed(() => {
//   console.log('baseUri:', baseUri);
//   return `${baseUri}/upload`;
// });

const uploadUrl = `${baseUri}/upload`;
// 动态生成上传参数
const uploadParams = computed(() => ({
  targetType: 2,
  targetId: roleId.value,
  fileCategory: 1
}));
const uploadParams2 = computed(() => ({
  targetType: 2,
  targetId: roleId.value,
  fileCategory: 2
}));
const uploadParams3 = computed(() => ({
  targetType: 2,
  targetId: roleId.value,
  fileCategory: 3
}));
const uploadParams4 = computed(() => ({
  targetType: 2,
  targetId: roleId.value,
  fileCategory: 4
}));

// const onRemove = (options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, index: number }) => Promise<boolean> | boolean | any
const onRemove = async (options: { file: UploadFileInfo; fileList: Array<UploadFileInfo>; index: number }) => {
  console.log('options: ', options);
  // options.file.id
  // {"code":200,"msg":"删除成功！","data":null}
  const res = await deleteLocalFileById(options.file.id);
  console.log('res: ', res);
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
    // (res.data ?? []).map(item => { ... })

    // Array.from(res.data).map(item => { ... })

    // (res.data as Array<any>).map(item => { ... })
    // (res.data as YourItemType[]).map(item => { ... })

    const safeData = Array.isArray(res.data) ? res.data : [];
    // 修正后 ✅
    // imageFileList.value = safeData.map(item => ({
    //   id: item.id,
    //   name: item.fileName, // 注意确认字段名是否匹配
    //   status: 'finished',
    //   url: `${baseUri}/${item.fileUri}` // 确保 baseUri 已定义
    // }));

    // 遍历 safeData 并根据 fileCategory 分配到不同的数组
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

    // 在请求完成后添加调试语句
    console.log('Mapped files:', imageFileList.value);
    console.log('Is array:', Array.isArray(imageFileList.value)); // 应输出 true
  });
};
// window.$message?.success?.('刷新成功');
// window.location.reload();
const onFinish = ({ file }) => {
  console.log('onFinish', file);
  /*
  提前走一次或await
  */
  setTimeout(() => {
    initFileList();
    selectLocalFileListByParamsAgain();
  }, 500);
  return file;
};
const handleUpload = () => {
  imageFileList2.value = [];
};
function downloadFile(url, name) {
  // const name = "e.png"; // 文件名
  // const url = "http://localhost:8080/file/e6d505c7-9660-4ca1-8316-144fe8a2fd22.png"; // 文件URL

  // 创建 a 标签
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank'; // 在新标签页中打开
  anchor.download = name; // 强制下载

  // 由于某些浏览器需要将元素添加到DOM中才能触发下载，这里暂时添加然后立即移除
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
// const on-download = (file: FileInfo) => Promise<boolean> | boolean | any
const onDownload = (file: FileInfo) => {
  // console.log('onDownload', file);
  // downloadFile(file.url, 'optionalFileName.pdf');
  downloadFile(file.url, file.name);
  // return new Promise((resolve, reject) => {
  //   resolve(true);
  //   reject();
  // });
  return false;
};
// watch(visible, async () => {
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
const options3 = [];
// selectActivityLocationListWithApproved().then(res => {
//   options3.push(
//     ...res.data.map((item: any) => {
//       return {
//         label: item.name,
//         value: item.name
//       };
//     })
//   );
// });
selectActivityLocationList().then(res => {
  options3.push(
    ...res.data.map((item: any) => {
      if (item.approvalStatus === 0 || item.approvalStatus === 2) {
        return {
          label: `${item.name}（待审批）`,
          value: item.name,
          disabled: true
        };
      }
      if (item.approvalStatus === 2) {
        return {
          label: `${item.name}（审批拒绝）`,
          value: item.name,
          disabled: true
        };
      }
      return {
        label: item.name,
        value: item.name
      };
    })
  );
});

const toPressFn = () => {
  window.open('https://uutool.cn/tinymce/', '_blank');
};
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem v-if="!isEdit" label="所属社团">
          <NSelect v-model:value="model.clubId" :options="options" clearable />
        </NFormItem>
        <NFormItem label="活动名称">
          <NInput v-model:value="model.title" />
        </NFormItem>
        <NFormItem label="内容">
          <NInput v-model:value="model.content" type="textarea" />
        </NFormItem>
        <!--
 <NFormItem label="位置">
          <NInput v-model:value="model.location" />
        </NFormItem>
-->
        <NFormItem label="位置">
          <NSelect v-model:value="model.location" :options="options3" clearable />
        </NFormItem>
        <NFormItem label="开始时间">
          <NDatePicker v-model:value="model.startTime" type="datetime" clearable />
        </NFormItem>
        <NFormItem label="结束时间">
          <NDatePicker v-model:value="model.endTime" type="datetime" clearable />
        </NFormItem>

        <!-- tang -->
        <!--
 <NFormItem v-if="!isEdit" label="审批人">
          <NSelect v-model:value="model.approverId" :options="options" clearable />
        </NFormItem>
-->
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
            :on-finish="onFinish"
            :on-remove="onRemove"
            :on-download="onDownload"
          >
            <NButton>点击上传</NButton>
          </NUpload>

          <!-- <NButton @click="handleUpload">点击我</NButton> -->
        </NFormItem>

        <NFormItem label="附件">
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

        <NFormItem label="新闻稿编写工具">
          <NButton type="primary" dashed @click="toPressFn">点击访问</NButton>
        </NFormItem>
        <NFormItem label="新闻稿">
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
        <NFormItem label="展示新闻稿">
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
        <NFormItem v-if="isEdit" label="审批状态">
          <NSelect v-model:value="model.approvalStatus" :options="options2" clearable />
        </NFormItem>

        <NFormItem v-if="isEdit" label="审批原因">
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
