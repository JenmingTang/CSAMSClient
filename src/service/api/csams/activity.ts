import { request } from '../../request';
export function selectActivityListByParams(params: Api.Activity.ActivitySearchParams) {
  const res = request<Api.Activity.ActivityVOList>({
    url: '/activity/selectActivityListByParams',
    method: 'get',
    params
  });
  return res;
}

export function deleteActivityById(id: number) {
  return request<App.Service.Response>({
    url: `/activity/deleteActivityById/${id}`,
    method: 'delete'
  });
}

export function deleteActivityListByIdList(list: number[]) {
  return request<App.Service.Response>({
    url: `/activity/deleteActivityListByIdList`,
    method: 'delete',
    data: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateActivity(activity: Api.Activity.Activity) {
  return request<App.Service.Response>({
    url: `activity/insertOrUpdateActivity`,
    method: 'post',
    data: JSON.stringify(activity),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function selectActivityList() {
  return request<App.Service.Response>({
    url: '/activity/selectActivityList',
    method: 'get'
  });
}
export function selectActivityListWithApproved() {
  return request<App.Service.Response>({
    url: '/activity/selectActivityListWithApproved',
    method: 'get'
  });
}
//

export function selectActivityMemberListByParams(params: Api.ActivityMember.ActivityMemberSearchParams) {
  const res = request<Api.ActivityMember.ActivityMemberVOList>({
    url: '/activityMember/selectActivityMemberListByParams',
    method: 'get',
    params
  });
  return res;
}

export function deleteActivityMemberById(id: number) {
  return request<App.Service.Response>({
    url: `/activityMember/deleteActivityMemberById/${id}`,
    method: 'delete'
  });
}

export function deleteActivityMemberListByIdList(list: number[]) {
  return request<App.Service.Response>({
    url: `/activityMember/deleteActivityMemberListByIdList`,
    method: 'delete',
    data: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateActivityMember(activityMember: Api.ActivityMember.ActivityMember) {
  return request<App.Service.Response>({
    url: `activityMember/insertOrUpdateActivityMember`,
    method: 'post',
    data: JSON.stringify(activityMember),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function selectActivityMemberList() {
  return request<App.Service.Response>({
    url: '/activityMember/selectActivityMemberList',
    method: 'get'
  });
}
export function selectActivityMemberListWithApproved() {
  return request<App.Service.Response>({
    url: '/activityMember/selectActivityMemberListWithApproved',
    method: 'get'
  });
}

//

export function selectActivityLocationListByParams(params: Api.ActivityLocation.ActivityLocationSearchParams) {
  const res = request<Api.ActivityLocation.ActivityLocationVOList>({
    url: '/activityLocation/selectActivityLocationListByParams',
    method: 'get',
    params
  });
  return res;
}

export function deleteActivityLocationById(id: number) {
  return request<App.Service.Response>({
    url: `/activityLocation/deleteActivityLocationById/${id}`,
    method: 'delete'
  });
}

export function deleteActivityLocationListByIdList(list: number[]) {
  return request<App.Service.Response>({
    url: `/activityLocation/deleteActivityLocationListByIdList`,
    method: 'delete',
    data: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function insertOrUpdateActivityLocation(activityLocation: Api.ActivityLocation.ActivityLocation) {
  return request<App.Service.Response>({
    url: `activityLocation/insertOrUpdateActivityLocation`,
    method: 'post',
    data: JSON.stringify(activityLocation),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function selectActivityLocationList() {
  return request<App.Service.Response>({
    url: '/activityLocation/selectActivityLocationList',
    method: 'get'
  });
}
export function selectActivityLocationListWithApproved() {
  return request<App.Service.Response>({
    url: '/activityLocation/selectActivityLocationListWithApproved',
    method: 'get'
  });
}
