import { request } from '../../request';
export function selectUserListByParams(params: Api.Sys.UserSearchParams) {
  return request<Api.Sys.UserList>({
    url: '/user/selectUserListByParams',
    method: 'get',
    params
  });
}

export function deleteUserById(id: number) {
  return request<App.Service.Response>({
    url: `/user/deleteUserById/${id}`,
    method: 'delete'
  });
}

export function deleteUserListByIdList(idList: number[]) {
  return request<App.Service.Response>({
    url: `/user/deleteUserListByIdList`,
    method: 'delete',
    data: JSON.stringify(idList),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateUser(obj: Api.Sys.User) {
  return request<App.Service.Response>({
    url: `/user/insertOrUpdateUser`,
    method: 'post',
    data: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function selectUserList() {
  return request<App.Service.Response>({
    url: `/user/selectUserList`,
    method: 'get'
  });
}
//
export function selectRoleListByParams(params: Api.Sys.RoleSearchParams) {
  return request<Api.Sys.RoleList>({
    url: '/role/selectRoleListByParams',
    method: 'get',
    params
  });
}
export function deleteRoleById(id: number) {
  return request<App.Service.Response>({
    url: `/role/deleteRoleById/${id}`,
    method: 'delete'
  });
}

export function deleteRoleListByIdList(idList: number[]) {
  return request<App.Service.Response>({
    url: `/role/deleteRoleListByIdList`,
    method: 'delete',
    data: JSON.stringify(idList),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateRole(obj: Api.Sys.Role) {
  return request<App.Service.Response>({
    url: `/role/insertOrUpdateRole`,
    method: 'post',
    data: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function selectRoleList() {
  return request<App.Service.Response>({
    url: `/role/selectRoleList`,
    method: 'get'
  });
}
export function selectRoleIdListByUserId(userId: number) {
  return request<App.Service.Response>({
    url: `/role/selectRoleIdListByUserId/${userId}`,
    method: 'get'
  });
}
export function updateUserRoleByUserIdAndRoleIds(userId: number, roleIds: number[]) {
  return request<App.Service.Response>({
    url: `/user-role/update`,
    method: 'post',
    data: JSON.stringify({
      userId,
      roleIds
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
// Permission
export function selectPermissionIdListByRoleId(userId: number) {
  return request<App.Service.Response>({
    url: '/permission/selectPermissionIdListByRoleId',
    method: 'get',
    params: {
      userId
    }
  });
}
export function selectPermissionList() {
  return request<App.Service.Response>({
    url: `/permission/selectPermissionList`,
    method: 'get'
  });
}

export function updateRolePermissions(roleId: number, permissionIds: number[]) {
  return request<App.Service.Response>({
    url: `/role-permission/update`,
    method: 'post',
    data: JSON.stringify({
      roleId,
      permissionIds
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
