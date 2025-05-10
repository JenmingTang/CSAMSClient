<script setup lang="tsx">
import { NButton, NPopconfirm, NSwitch, NTag } from 'naive-ui';
import { ref } from 'vue';

import { utils, writeFile } from 'xlsx';
import {
  deleteUserById,
  deleteUserListByIdList,
  selectUserList,
  selectUserListByParams
} from '@/service/api/csams/sys';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import UserOperateDrawer from './modules/user-operate-drawer.vue';
import UserSearch from './modules/user-search.vue';

const { hasAuth } = useAuth();
const appStore = useAppStore();
const isEnabledSwitch = ref(false);
// const handleChange = (value: boolean, row: any) => {
//   console.log('Switch changed to:', value);
//   // 处理开关变化的逻辑，例如更新用户状态
//   // 可以在这里调用 API 更新用户状态
// };
const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: selectUserListByParams,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    username: null,
    realName: null,
    college: null,
    major: null,
    userClass: null,
    phone: null,
    email: null,
    avatarUrl: null,
    enabled: null,
    createTime: null,
    updateTime: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'id',
      title: 'ID',
      align: 'center',
      width: 64
    },
    {
      key: 'username',
      title: $t('page.manage.user.userName'),
      align: 'center',
      minWidth: 100
    },
    // {
    //   key: 'realName',
    //   title: '姓名',
    //   align: 'center',
    //   minWidth: 100
    // },
    // {
    //   key: 'college',
    //   title: '学院',
    //   align: 'center',
    //   minWidth: 200
    // },
    // {
    //   key: 'major',
    //   title: '专业',
    //   align: 'center',
    //   minWidth: 200
    // },
    // {
    //   key: 'userClass',
    //   title: '班级',
    //   align: 'center',
    //   minWidth: 200
    // },
    // {
    //   key: 'phone',
    //   title: $t('page.manage.user.userPhone'),
    //   align: 'center',
    //   width: 120
    // },
    // {
    //   key: 'email',
    //   title: $t('page.manage.user.userEmail'),
    //   align: 'center',
    //   minWidth: 200
    // },
    // {
    //   key: 'avatarUrl',
    //   title: '头像',
    //   align: 'center',
    //   minWidth: 200
    // },
    {
      key: 'enabled',
      title: $t('page.manage.user.userStatus'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.enabled === null) {
          return null;
        }

        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          0: 'warning'
        };

        // const label = $t(enableStatusRecord[row.enabled]);

        // return <NTag type={tagMap[row.enabled]}>{label}</NTag>;
        return <NTag type={tagMap[row.enabled]}>{row.enabled === 1 ? '启用' : '禁用'}</NTag>;
      }
    },
    // {
    //   key: 'isEnabled',
    //   title: $t('page.manage.user.userStatus'),
    //   align: 'center',
    //   width: 100,
    //   render: row => {
    //     if (row.isEnabled === null) {
    //       return null;
    //     }
    //     // if (row.isEnabled === 1) {
    //     //   isEnabledSwitch.value = true;
    //     // }

    //     const handleChange = async (value: boolean) => {
    //       const newStatus = value ? 1 : 0;
    //       if (row.isEnabled !== newStatus) {
    //         row.isEnabled = newStatus;
    //         try {
    //           // await insertOrUpdateUser(row.id, newStatus);
    //           await insertOrUpdateUser(row.id, newStatus);
    //           // 更新成功后的逻辑
    //         } catch (error) {
    //           console.error('Failed to update user status:', error);
    //           // 恢复原状态
    //           row.isEnabled = value ? 0 : 1;
    //         }
    //       }
    //     };
    //     // return <n-switch v-model:value={isEnabledSwitch} onUpdate:value={(value: boolean) => handleChange(value, row)} />;
    //     return <NSwitch checked={row.isEnabled === 1} onUpdate:value={handleChange} />;
    //     // 多个标签
    //     // return (
    //     //   <>
    //     //     <NTag type={tagMap[row.isEnabled]}>{label}</NTag>
    //     //     <NSwitch checked={row.isEnabled === 1} onUpdate:value={handleChange} />
    //     //   </>
    //     // );
    //   }
    // },

    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      minWidth: 120
    },

    // {
    //   key: 'updateTime',
    //   title: '更新时间',
    //   align: 'center',
    //   minWidth: 120
    // },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          {/* v-if={hasAuth('BUTTON_EDIT')} 并不生效 */}
          {/* <NButton v-if={hasAuth('BUTTON_EDIT')} type="primary" ghost size="small" onClick={() => edit(row.id)}> */}
          {/* 外层套上template标签也不得 */}

          {hasAuth('BUTTON_EDIT_USER') ? (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          ) : null}
          {hasAuth('BUTTON_DELETE_USER') && (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          )}
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  await deleteUserListByIdList(checkedRowKeys.value);
  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  console.log(id);

  await deleteUserById(id);
  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}

async function exportExcel(isAllData: boolean, e: any) {
  // tang
  const exportColumns = columns.value.slice(2);
  let excelList = [];

  if (isAllData) {
    const resp = await selectUserList();
    excelList = resp.data.map(item => {
      return exportColumns.map(col => getTableValue(col, item));
    });
  } else {
    excelList = data.value.map(item => {
      return exportColumns.map(col => getTableValue(col, item));
    });
  }

  const titleList = exportColumns.map(col => (isTableColumnHasTitle(col) && col.title) || null);

  excelList.unshift(titleList);

  const workBook = utils.book_new();

  const workSheet = utils.aoa_to_sheet(excelList);

  workSheet['!cols'] = exportColumns.map(item => ({
    // tang
    width: Math.round(Number(item.width) / 10 || 20)
  }));

  utils.book_append_sheet(workBook, workSheet, '用户列表');

  writeFile(workBook, '用户数据.xlsx');
}
// tang
function getTableValue(
  col: NaiveUI.TableColumn<NaiveUI.TableDataWithIndex<Api.Sys.User>>,
  item: NaiveUI.TableDataWithIndex<Api.Sys.User>
) {
  if (!isTableColumnHasKey(col)) {
    return null;
  }

  const { key } = col;

  if (key === 'operate') {
    return null;
  }

  if (key === 'enabled') {
    return item.enabled === 1 ? '启用' : '禁用';
  }

  if (key === 'userRoles') {
    return item.userRoles.map(role => role).join(',');
  }

  if (key === 'status') {
    return (item.status && $t(enableStatusRecord[item.status])) || null;
  }

  if (key === 'userGender') {
    return (item.userGender && $t(userGenderRecord[item.userGender])) || null;
  }

  return item[key];
}

function isTableColumnHasKey<T>(column: NaiveUI.TableColumn<T>): column is NaiveUI.TableColumnWithKey<T> {
  return Boolean((column as NaiveUI.TableColumnWithKey<T>).key);
}

function isTableColumnHasTitle<T>(column: NaiveUI.TableColumn<T>): column is NaiveUI.TableColumnWithKey<T> & {
  title: string;
} {
  return Boolean((column as NaiveUI.TableColumnWithKey<T>).title);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.manage.user.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <NSpace align="end" wrap justify="end" class="lt-sm:w-200px">
          <NButton v-if="hasAuth('BUTTON_EXCEL_USER')" size="small" ghost type="primary" @click="exportExcel(false)">
            <template #icon>
              <icon-file-icons:microsoft-excel class="text-icon" />
            </template>
            导出excel
          </NButton>
          <NButton v-if="hasAuth('BUTTON_EXCEL_USER_ALL')" size="small" ghost type="primary" @click="exportExcel(true)">
            <template #icon>
              <icon-file-icons:microsoft-excel class="text-icon" />
            </template>
            导出全部
          </NButton>
          <!--
        tang
          :show-add-button="hasAuth('BUTTON_ADD')"
          :show-batch-delete-button="hasAuth('BUTTON_BATCH_DELETE')"
          已经封装在 TableHeaderOperation 中，直接使用即可
          -->
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :disabled-delete="checkedRowKeys.length === 0"
            :loading="loading"
            show-add-button-str="BUTTON_ADD_USER"
            show-batch-delete-button-str="BUTTON_BATCH_DELETE_USER"
            @add="handleAdd"
            @delete="handleBatchDelete"
            @refresh="getData"
          />
        </NSpace>
      </template>
      <!--
        控制底部滚动条
        :scroll-x="962"
        控制高度自适应
        :flex-height="!appStore.isMobile"
      -->
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
