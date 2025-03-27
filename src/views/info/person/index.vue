<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { utils, writeFile } from 'xlsx';
import { computed, defineComponent, ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import { enableStatusRecord } from '@/constants/business';
import { selectUserList, selectUserListByParams } from '@/service/api/csams/sys';
import { useAuth } from '@/hooks/business/auth';
import RoleOperateDrawer from './modules/role-operate-drawer.vue';
import RoleSearch from './modules/role-search.vue';

const { hasAuth } = useAuth();

const appStore = useAppStore();
// // 通用样式
// const sensitiveStyle = {
//   transition: 'all 0.3s',
//   filter: 'opacity(0.3) blur(2px)',
//   cursor: 'pointer'
// };

// const clearStyle = {
//   filter: 'none',
//   opacity: 1
// };

// // 方案一：使用函数组件
// const SensitiveCell = ({ value }: { value: string }) => {
//   const hovered = ref(false);

//   return (
//     <div
//       style={{ display: 'inline-block', position: 'relative' }}
//       onMouseenter={() => (hovered.value = true)}
//       onMouseleave={() => (hovered.value = false)}
//     >
//       <span style={hovered.value ? clearStyle : sensitiveStyle}>{value}</span>
//     </div>
//   );
// };
// 定义 SensitiveCell 组件
const SensitiveCell = defineComponent({
  name: 'SensitiveCell',
  props: {
    value: {
      type: String,
      required: true
    },
    blurLevel: {
      type: Number,
      default: 2
    }
  },
  setup(props) {
    const hovered = ref(false);

    // 动态样式计算
    const blurStyle = computed(() => ({
      transition: 'all 0.3s',
      filter: `opacity(0.3) blur(${props.blurLevel}px)`,
      cursor: 'pointer',
      userSelect: 'none' // 防止复制
    }));

    const clearStyle = {
      filter: 'none',
      opacity: 1
    };

    return () => (
      <div
        class="sensitive-cell-wrapper"
        onMouseenter={() => (hovered.value = true)}
        onMouseleave={() => (hovered.value = false)}
        style={{ display: 'inline-block' }}
      >
        <span style={hovered.value ? clearStyle : blurStyle.value}>{props.value}</span>
      </div>
    );
  }
});

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
  apiFn: selectUserListByParams,
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
      width: 64,
      align: 'center'
    },
    {
      key: 'realName',
      title: '姓名',
      align: 'center',
      minWidth: 100
    },
    {
      key: 'college',
      title: '学院',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'major',
      title: '专业',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'userClass',
      title: '班级',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'phone',
      title: $t('page.manage.user.userPhone'),
      align: 'center',
      width: 120,
      render: row => (
        <div class="flex-center gap-8px">
          {/* 直接使用组件 */}
          <SensitiveCell value={row.phone} blurLevel={3} />

          {/* 如果需要显示其他内容 */}
          {/* <span>其他元素</span> */}
        </div>
      )
    },
    {
      key: 'email',
      title: $t('page.manage.user.userEmail'),
      align: 'center',
      minWidth: 120,
      // render: ({ text }) => <SensitiveCell value={text} />
      // render: row => (
      //   <div class="flex-center gap-8px">
      //     <SensitiveCell value={row.email} />
      //   </div>
      // )

      render: row => <SensitiveCell value={row.email} />
    },
    {
      key: 'avatarUrl',
      title: '头像',
      align: 'center',
      minWidth: 120
    },

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
          {hasAuth('BUTTON_EDIT_PERSON') ? (
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.edit')}
            </NButton>
          ) : null}
          {hasAuth('BUTTON_DELETE_PERSON') && (
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

  onBatchDeleted();
}

function handleDelete(id: number) {
  // request
  console.log(id);

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

  utils.book_append_sheet(workBook, workSheet, '人员列表');

  writeFile(workBook, '人员数据.xlsx');
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
    <NCard title="人员列表" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <NSpace align="end" wrap justify="end" class="lt-sm:w-200px">
          <NButton v-if="hasAuth('BUTTON_EXCEL_PERSON')" size="small" ghost type="primary" @click="exportExcel(false)">
            <template #icon>
              <icon-file-icons:microsoft-excel class="text-icon" />
            </template>
            导出excel
          </NButton>
          <NButton
            v-if="hasAuth('BUTTON_EXCEL_PERSON_ALL')"
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
            show-add-button-str="BUTTON_ADD_PERSON"
            show-batch-delete-button-str="BUTTON_BATCH_DELETE_PERSON"
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

<style scoped>
/* .sensitive-cell {
  transition: all 0.3s;
  filter: opacity(0.3) blur(2px);
  cursor: pointer;
}

.sensitive-cell:hover {
  filter: none !important;
  opacity: 1 !important;
}
@keyframes ripple {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}

.sensitive-cell-wrapper::after {
  content: '';
  position: absolute;
  animation: ripple 0.6s ease-out;
}  */
</style>
