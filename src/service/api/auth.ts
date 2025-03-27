import { request } from '../request';

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
// tang
export function fetchLogin(userName: string, password: string, isRememberMe: boolean) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/login',
    method: 'post',
    data: {
      username: userName,
      password,
      isRememberMe
    }
  });
}
// tang
export function logoutFn() {
  return request<App.Service.Response>({
    url: `/auth/logout`,
    method: 'get'
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: '/auth/getUserInfo' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}
