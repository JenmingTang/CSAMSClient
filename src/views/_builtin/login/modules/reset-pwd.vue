<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { $t } from '@/locales';
import { useRouterPush } from '@/hooks/common/router';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';

import { reset, sendEmail } from '@/service/api/csams/password';
defineOptions({
  name: 'ResetPwd'
});

const { toggleLoginModule } = useRouterPush();
const { formRef, validate } = useNaiveForm();

interface ResetPasswordDTO {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}
const model: ResetPasswordDTO = reactive({
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
});

async function handleSubmit() {
  await validate();
  await reset(model);
  // request to reset password
  window.$message?.success($t('page.login.common.validateSuccess'));
}

const loading = ref(false);

async function handleClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 60000);
  // console.log('handleClick');
  // console.log(model.email);
  await sendEmail(model.email);
}
</script>

<template>
  <NForm ref="formRef" :model="model" size="large" :show-label="false" @keyup.enter="handleSubmit">
    <NFormItem path="email">
      <NInput v-model:value="model.email" placeholder="请输入邮箱" />
      <NButton :loading="loading" @click="handleClick">发送</NButton>
    </NFormItem>
    <NFormItem path="code">
      <NInput v-model:value="model.code" :placeholder="$t('page.login.common.codePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NFormItem path="confirmPassword">
      <NInput
        v-model:value="model.confirmPassword"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.confirmPasswordPlaceholder')"
      />
    </NFormItem>
    <NSpace vertical :size="18" class="w-full">
      <NButton type="primary" size="large" round block @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <NButton size="large" round block @click="toggleLoginModule('pwd-login')">
        {{ $t('page.login.common.back') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
