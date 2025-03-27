import { request } from '../../request';
export function selectInfoDepartmentListByParams(params: Api.Info.InfoDepartmentSearchParams) {
  const res = request<Api.Info.InfoDepartmentList>({
    url: '/infoDepartment/selectInfoDepartmentListByParams',
    method: 'get',
    params
  });
  return res;
}

export function deleteInfoDepartmentById(id: number) {
  return request<App.Service.Response>({
    url: `/infoDepartment/deleteInfoDepartmentById/${id}`,
    method: 'delete'
  });
}

export function deleteInfoDepartmentListByIdList(list: number[]) {
  return request<App.Service.Response>({
    url: `/infoDepartment/deleteInfoDepartmentListByIdList`,
    method: 'delete',
    data: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateInfoDepartment(infoDepartment: Api.Info.InfoDepartment) {
  return request<App.Service.Response>({
    url: `infoDepartment/insertOrUpdateInfoDepartment`,
    method: 'post',
    data: JSON.stringify(infoDepartment),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function selectInfoDepartmentList() {
  return request<App.Service.Response>({
    url: '/infoDepartment/selectInfoDepartmentList',
    method: 'get'
  });
}

// major

export function selectInfoMajorListByParams(params: Api.Info.InfoMajorSearchParams) {
  return request<Api.Info.InfoMajorVOList>({
    url: '/infoMajor/selectInfoMajorListByParams',
    method: 'get',
    params
  });
}

export function deleteInfoMajorById(id: number) {
  return request<App.Service.Response>({
    url: `/infoMajor/deleteInfoMajorById/${id}`,
    method: 'delete'
  });
}

export function deleteInfoMajorListByIdList(list: number[]) {
  return request<App.Service.Response>({
    url: `/infoMajor/deleteInfoMajorListByIdList`,
    method: 'delete',
    data: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateInfoMajor(infoMajor: Api.Info.InfoMajor) {
  return request<App.Service.Response>({
    url: `infoMajor/insertOrUpdateInfoMajor`,
    method: 'post',
    data: JSON.stringify(infoMajor),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
export function selectInfoMajorList() {
  return request<App.Service.Response>({
    url: '/infoMajor/selectInfoMajorList',
    method: 'get'
  });
}
// class

export function selectInfoClassListByParams(params: Api.Info.InfoClassSearchParams) {
  return request<Api.Info.InfoClassVOList>({
    url: '/infoClass/selectInfoClassListByParams',
    method: 'get',
    params
  });
}

export function deleteInfoClassById(id: number) {
  return request<App.Service.Response>({
    url: `/infoClass/deleteInfoClassById/${id}`,
    method: 'delete'
  });
}

export function deleteInfoClassListByIdList(list: number[]) {
  return request<App.Service.Response>({
    url: `/infoClass/deleteInfoClassListByIdList`,
    method: 'delete',
    data: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateInfoClass(infoClass: Api.Info.InfoClass) {
  return request<App.Service.Response>({
    url: `infoClass/insertOrUpdateInfoClass`,
    method: 'post',
    data: JSON.stringify(infoClass),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function selectInfoClassList() {
  return request<App.Service.Response>({
    url: '/infoClass/selectInfoClassList',
    method: 'get'
  });
}
