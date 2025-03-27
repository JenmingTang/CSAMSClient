<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { utils, writeFile } from 'xlsx';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import {
  deleteActivityById,
  deleteActivityListByIdList,
  selectActivityList,
  selectActivityListByParams
} from '@/service/api/csams/activity';
import { useAuth } from '@/hooks/business/auth';
import RoleOperateDrawer from './modules/role-operate-drawer.vue';
import RoleSearch from './modules/role-search.vue';

const { hasAuth } = useAuth();

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  loading,
  getData,
  getDataByPage,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: selectActivityListByParams,
  apiParams: {
    current: 1,
    size: 10,
    approvalStatus: null,
    approveReason: null,
    approverId: null,
    approveTime: null,
    createTime: null,
    updateTime: null,
    id: null,
    title: null,
    content: null,
    clubId: null,
    location: null,
    startTime: null,
    endTime: null,
    //
    clubName: null,
    approverName: null
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
      width: 64,
      align: 'center'
    },
    {
      key: 'title',
      title: '活动名称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'content',
      title: '内容',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'clubName',
      title: '所属社团',
      align: 'center',
      minWidth: 120
    },

    {
      key: 'location',
      title: '位置',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'startTime',
      title: '开始时间',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'endTime',
      title: '结束时间',
      align: 'center',
      minWidth: 120
    },

    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      minWidth: 120
    },

    {
      key: 'approvalStatus',
      title: '审批状态',
      align: 'center',
      minWidth: 120,
      render: row => {
        if (row.approvalStatus === null) {
          return null;
        }

        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          0: 'warning',
          2: 'error'
        };
        let label;
        if (row.approvalStatus === 0) {
          label = '待审批';
        }
        if (row.approvalStatus === 1) {
          label = '审批通过';
        }
        if (row.approvalStatus === 2) {
          label = '审批拒绝';
        }
        return <NTag type={tagMap[row.approvalStatus]}>{label}</NTag>;
      }
    },

    {
      key: 'approverName',
      title: '审批人',
      align: 'center',
      minWidth: 120
    },

    {
      key: 'approveTime',
      title: '审批时间',
      align: 'center',
      minWidth: 120
    },

    {
      key: 'approveReason',
      title: '审批原因',
      align: 'center',
      minWidth: 120
    },

    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('BUTTON_EDIT_ACTIVITY') ? (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          ) : null}
          {hasAuth('BUTTON_DELETE_ACTIVITY') && (
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
  await deleteActivityListByIdList(checkedRowKeys.value);
  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  console.log(id);
  await deleteActivityById(id);
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
    const resp = await selectActivityListByParams({
      size: 999999
    });
    excelList = resp.data.records.map(item => {
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

  utils.book_append_sheet(workBook, workSheet, '活动列表');

  writeFile(workBook, '活动数据.xlsx');
} // tang
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
  if (key === 'approvalStatus') {
    let label;
    if (item.approvalStatus === 0) {
      label = '待审批';
    }
    if (item.approvalStatus === 1) {
      label = '审批通过';
    }
    if (item.approvalStatus === 2) {
      label = '审批拒绝';
    }
    return label;
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
    <RoleSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard title="活动列表" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <NSpace align="end" wrap justify="end" class="lt-sm:w-200px">
          <NButton
            v-if="hasAuth('BUTTON_EXCEL_ACTIVITY')"
            size="small"
            ghost
            type="primary"
            @click="exportExcel(false)"
          >
            <template #icon>
              <icon-file-icons:microsoft-excel class="text-icon" />
            </template>
            导出excel
          </NButton>
          <NButton
            v-if="hasAuth('BUTTON_EXCEL_ACTIVITY_ALL')"
            size="small"
            ghost
            type="primary"
            @click="exportExcel(true)"
          >
            <template #icon>
              <icon-file-icons:microsoft-excel class="text-icon" />
            </template>
            导出全部
          </NButton>
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :disabled-delete="checkedRowKeys.length === 0"
            :loading="loading"
            show-add-button-str="BUTTON_ADD_ACTIVITY"
            show-batch-delete-button-str="BUTTON_BATCH_DELETE_ACTIVITY"
            @add="handleAdd"
            @delete="handleBatchDelete"
            @refresh="getData"
          />
        </NSpace>
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="702"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <RoleOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
