import { request } from '../../request';

//
export function selectLocalFileListByParams(params: Api.LocalFile.LocalFileSearchParams) {
  return request<App.Service.Response>({
    url: '/localFile/selectLocalFileListByParams',
    method: 'get',
    params
  });
}

export function deleteLocalFileById(id: number) {
  return request<App.Service.Response>({
    url: `/localFile/deleteLocalFileById/${id}`,
    method: 'delete'
  });
}

export function deleteLocalFileListByIdList(list: number[]) {
  return request<App.Service.Response>({
    url: `/localFile/deleteLocalFileListByIdList`,
    method: 'delete',
    data: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateLocalFile(localFile: Api.LocalFile.LocalFile) {
  return request<App.Service.Response>({
    url: `localFile/insertOrUpdateLocalFile`,
    method: 'post',
    data: JSON.stringify(localFile),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function selectLocalFileList() {
  return request<App.Service.Response>({
    url: '/localFile/selectLocalFileList',
    method: 'get'
  });
}
