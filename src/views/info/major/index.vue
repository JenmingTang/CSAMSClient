<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { utils, writeFile } from 'xlsx';
import {
  deleteInfoMajorById,
  deleteInfoMajorListByIdList,
  selectInfoMajorList,
  selectInfoMajorListByParams
} from '@/service/api/csams/info';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { enableStatusRecord } from '@/constants/business';
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
  apiFn: selectInfoMajorListByParams,
  apiParams: {
    current: 1,
    size: 10,
    createTimeStart: null,
    createTimeEnd: null,
    departmentId: null,
    code: null,
    name: null,
    description: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'id',
      title: 'ID',
      width: 64,
      align: 'center'
    },
    {
      key: 'departmentName',
      title: '所属部门',
      width: 120,
      align: 'center'
    },
    {
      key: 'name',
      title: '专业名称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'code',
      title: '专业编码',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'description',
      title: '专业描述',
      minWidth: 120,
      render: row => {
        return (
          <n-performant-ellipsis style="max-width: 120px" line-clamp={2}>
            {row.description}
          </n-performant-ellipsis>
        );
      }
    },
    {
      key: 'createTime',
      title: '创建时间',
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('BUTTON_EDIT_MAJOR') ? (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          ) : null}
          {hasAuth('BUTTON_DELETE_MAJOR') && (
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
  await deleteInfoMajorListByIdList(checkedRowKeys.value);
  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  console.log(id);
  await deleteInfoMajorById(id);
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
    /*
    tang 不是VO对象，拿不到关联数据
    */
    // const resp = await selectInfoMajorList();
    const resp = await selectInfoMajorListByParams({
      size: 999999
    });
    // excelList = resp.data.map(item => {
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

  utils.book_append_sheet(workBook, workSheet, '专业列表');

  writeFile(workBook, '专业数据.xlsx');
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
    <NCard title="专业列表" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <NSpace align="end" wrap justify="end" class="lt-sm:w-200px">
          <NButton v-if="hasAuth('BUTTON_EXCEL_MAJOR')" size="small" ghost type="primary" @click="exportExcel(false)">
            <template #icon>
              <icon-file-icons:microsoft-excel class="text-icon" />
            </template>
            导出excel
          </NButton>
          <NButton
            v-if="hasAuth('BUTTON_EXCEL_MAJOR_ALL')"
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
            show-add-button-str="BUTTON_ADD_MAJOR"
            show-batch-delete-button-str="BUTTON_BATCH_DELETE_MAJOR"
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
