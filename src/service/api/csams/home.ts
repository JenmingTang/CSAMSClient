import { request } from '../../request';
export function index() {
  const res = request<App.Service.Response>({
    url: '/home',
    method: 'get'
  });
  return res;
}
