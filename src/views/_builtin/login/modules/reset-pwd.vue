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

// 密码验证：至少8位，包含字母、数字、特殊字符三种类型
const validatePassword = (password: string): string => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password); // 非字母数字字符
  const typeCount = (hasLetter ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSymbol ? 1 : 0);

  if (password.length < 8) {
    return '密码必须至少8位';
  }
  if (typeCount < 3) {
    return '密码必须包含字母、数字和特殊字符中的至少三种类型';
  }
  return '';
};

// 实时验证计算属性
const confirmPasswordError = computed(() => validatePassword(model.confirmPassword));
const passwordError = computed(() => validatePassword(model.password));
async function handleSubmit() {
  if (!confirmPasswordError.value && !passwordError.value) {
    // console.log('提交成功:', model);
    // 这里添加实际提交逻辑
  } else {
    // console.log('验证失败');
    window.$message?.error('学工号（纯数字8/15位）或密码错误（8位且包含字母、数字、特殊字符）！');
    return;
  }
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
