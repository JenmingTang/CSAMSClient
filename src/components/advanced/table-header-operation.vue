<script setup lang="ts">
import { $t } from '@/locales';

import { useAuth } from '@/hooks/business/auth';
const { hasAuth } = useAuth();
defineOptions({
  name: 'TableHeaderOperation'
});

interface Props {
  itemAlign?: NaiveUI.Align;
  disabledDelete?: boolean;
  loading?: boolean;
  // tang
  showAddButtonStr?: string;
  showBatchDeleteButtonStr?: string;
}

defineProps<Props>();

interface Emits {
  (e: 'add'): void;
  (e: 'delete'): void;
  (e: 'refresh'): void;
}

const emit = defineEmits<Emits>();

const columns = defineModel<NaiveUI.TableColumnCheck[]>('columns', {
  default: () => []
});

function add() {
  emit('add');
}

function batchDelete() {
  emit('delete');
}

function refresh() {
  emit('refresh');
}
</script>

<template>
  <NSpace :align="itemAlign" wrap justify="end" class="lt-sm:w-200px">
    <slot name="prefix"></slot>
    <slot name="default">
      <!-- tang -->
      <!-- <NButton size="small" ghost type="primary" @click="add"> -->
      <!-- <NButton v-if="props.showAddButton" size="small" ghost type="primary" @click="add"> -->
      <NButton v-if="hasAuth(showAddButtonStr)" size="small" ghost type="primary" @click="add">
        <template #icon>
          <icon-ic-round-plus class="text-icon" />
        </template>
        {{ $t('common.add') }}
      </NButton>
      <NPopconfirm @positive-click="batchDelete">
        <template #trigger>
          <!-- <NButton size="small" ghost type="error" :disabled="disabledDelete"> -->
          <!--
 <div v-if="!props.showBatchDeleteButton"></div>这个不得
          <NButton v-if="props.showBatchDeleteButton" size="small" ghost type="error" :disabled="disabledDelete">
-->
          <!-- <div v-if="!hasAuth('BUTTON_BATCH_DELETE')"></div> -->
          <div v-if="!hasAuth(showBatchDeleteButtonStr)"></div>
          <!-- <NButton v-if="props.showBatchDeleteButton" size="small" ghost type="error" :disabled="disabledDelete"> -->
          <NButton v-if="hasAuth(showBatchDeleteButtonStr)" size="small" ghost type="error" :disabled="disabledDelete">
            <template #icon>
              <icon-ic-round-delete class="text-icon" />
            </template>
            {{ $t('common.batchDelete') }}
          </NButton>
        </template>
        {{ $t('common.confirmDelete') }}
      </NPopconfirm>
    </slot>
    <NButton size="small" @click="refresh">
      <template #icon>
        <icon-mdi-refresh class="text-icon" :class="{ 'animate-spin': loading }" />
      </template>
      {{ $t('common.refresh') }}
    </NButton>
    <TableColumnSetting v-model:columns="columns" />
    <slot name="suffix"></slot>
  </NSpace>
</template>

<style scoped></style>
