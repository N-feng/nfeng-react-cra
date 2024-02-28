import { request } from "../../utils/request";

export async function deleteAccess (
  params: {
    // path
    /** userId */
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_string_>('access/remove', {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}

export async function queryAccessList (
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
) {
  return request.post('access/findAll', params)
}
