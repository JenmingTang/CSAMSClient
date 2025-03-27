import { request } from '../../request';
export function selectClubListByParams(params: Api.Club.ClubSearchParams) {
  const res = request<Api.Club.ClubVOList>({
    url: '/club/selectClubListByParams',
    method: 'get',
    params
  });
  return res;
}

export function deleteClubById(id: number) {
  return request<App.Service.Response>({
    url: `/club/deleteClubById/${id}`,
    method: 'delete'
  });
}

export function deleteClubListByIdList(list: number[]) {
  return request<App.Service.Response>({
    url: `/club/deleteClubListByIdList`,
    method: 'delete',
    data: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateClub(infoDepartment: Api.Club.Club) {
  return request<App.Service.Response>({
    url: `club/insertOrUpdateClub`,
    method: 'post',
    data: JSON.stringify(infoDepartment),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function selectClubList() {
  return request<App.Service.Response>({
    url: '/club/selectClubList',
    method: 'get'
  });
}
export function selectClubListWithApproved() {
  return request<App.Service.Response>({
    url: '/club/selectClubListWithApproved',
    method: 'get'
  });
}
//

export function selectClubMemberListByParams(params: Api.Club.ClubMemberSearchParams) {
  const res = request<Api.Club.ClubMemberVOList>({
    url: '/clubMember/selectClubMemberListByParams',
    method: 'get',
    params
  });
  return res;
}

export function deleteClubMemberById(id: number) {
  return request<App.Service.Response>({
    url: `/clubMember/deleteClubMemberById/${id}`,
    method: 'delete'
  });
}

export function deleteClubMemberListByIdList(list: number[]) {
  return request<App.Service.Response>({
    url: `/clubMember/deleteClubMemberListByIdList`,
    method: 'delete',
    data: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateClubMember(infoDepartment: Api.Club.ClubMember) {
  return request<App.Service.Response>({
    url: `clubMember/insertOrUpdateClubMember`,
    method: 'post',
    data: JSON.stringify(infoDepartment),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function selectClubMemberList() {
  return request<App.Service.Response>({
    url: '/clubMember/selectClubMemberList',
    method: 'get'
  });
}
//
