import { request } from '../../request';

// export function sendEmail(email: string) {
//   const res = request<App.Service.Response>({
//     url: '/password/send-email',
//     method: 'post',
//     data: { email }, // 改为传递对象，无需手动JSON.stringify
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   return res;
// }
export function sendEmail(email: string) {
  const res = request<App.Service.Response>({
    url: '/password/send-email',
    method: 'get',
    params: { email }
  });
  return res;
}
interface ResetPasswordDTO {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}
export function reset(resetPasswordDTO: ResetPasswordDTO) {
  const res = request<App.Service.Response>({
    url: '/password/reset',
    method: 'post',
    data: JSON.stringify(resetPasswordDTO),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res;
}
