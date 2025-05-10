<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { $t } from '@/locales';
import { loginModuleRecord } from '@/constants/app';
import { useRouterPush } from '@/hooks/common/router';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'PwdLogin'
});

const authStore = useAuthStore();
const { toggleLoginModule } = useRouterPush();
const { formRef, validate } = useNaiveForm();

interface FormModel {
  userName: string;
  password: string;
}

const model: FormModel = reactive({
  // userName: '202313143500334',
  userName: '12345678',
  password: 'Pwd#1234'
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules } = useFormRules();

  return {
    userName: formRules.userName,
    password: formRules.pwd
  };
});
// tang
const isRememberMe = ref(false);

// 用户名验证：纯数字且长度8或15位
const validateUsername = (username: string): string => {
  const regex = /^\d{8}$|^\d{15}$/;
  return regex.test(username) ? '' : '用户名必须是8位或15位的纯数字';
};

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
const usernameError = computed(() => validateUsername(model.userName));
const passwordError = computed(() => validatePassword(model.password));

async function handleSubmit() {
  // await validate();

  if (!usernameError.value && !passwordError.value) {
    // console.log('提交成功:', model);
    // 这里添加实际提交逻辑
  } else {
    // console.log('验证失败');
    window.$message?.error('学工号（纯数字8/15位）或密码错误（8位且包含字母、数字、特殊字符）！');
    return;
  }
  /*
  前端提示密码不对
  超时5秒后提示刷新界面再次尝试
  */
  const loginTimeout = setTimeout(async () => {
    // window.$message?.error('网络错误，请刷新网页，再次尝试！');
    window.$message?.error('网络错误，请再次尝试！');
    /*
    清空状态，停留界面
    */
    await authStore.resetStore();
  }, 5000);
  await authStore.login(model.userName, model.password, isRememberMe.value);
  // 手动关闭超时器
  clearTimeout(loginTimeout);
}

type AccountKey = 'super' | 'admin' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  userName: string;
  password: string;
}

const accounts = computed<Account[]>(() => [
  {
    key: 'super',
    label: $t('page.login.pwdLogin.superAdmin'),
    userName: 'Super',
    password: '123456'
  },
  {
    key: 'admin',
    label: $t('page.login.pwdLogin.admin'),
    userName: 'Admin',
    password: '123456'
  },
  {
    key: 'user',
    label: $t('page.login.pwdLogin.user'),
    userName: 'User',
    password: '123456'
  }
]);

async function handleAccountLogin(account: Account) {
  await authStore.login(account.userName, account.password);
}
/*
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false" @keyup.enter="handleSubmit">

*/
</script>

<template>
  <NForm ref="formRef" :model="model" size="large" :show-label="false" @keyup.enter="handleSubmit">
    <NFormItem path="userName">
      <NInput v-model:value="model.userName" :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NSpace vertical :size="24">
      <div class="flex-y-center justify-between">
        <NCheckbox v-model:checked="isRememberMe">{{ $t('page.login.pwdLogin.rememberMe') }}</NCheckbox>
        <NButton quaternary @click="toggleLoginModule('reset-pwd')">
          {{ $t('page.login.pwdLogin.forgetPassword') }}
        </NButton>
      </div>
      <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>

      <!--
 <div class="flex-y-center justify-between gap-12px">
        <NButton class="flex-1" block @click="toggleLoginModule('code-login')">
          {{ $t(loginModuleRecord['code-login']) }}
        </NButton>
        <NButton class="flex-1" block @click="toggleLoginModule('register')">邮箱登录</NButton>
      </div>
-->
      <!--
 <NDivider class="text-14px text-#666 !m-0">{{ $t('page.login.pwdLogin.otherAccountLogin') }}</NDivider>
      <div class="flex-center gap-12px">
        <NButton v-for="item in accounts" :key="item.key" type="primary" @click="handleAccountLogin(item)">
          {{ item.label }}
        </NButton>
      </div>
-->
    </NSpace>
  </NForm>
</template>

<style scoped></style>
