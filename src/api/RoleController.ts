import { request } from "../utils/request";

export async function queryRoleList (
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
  return request.post('role/findAll',  params)
}

export async function profile () {
  return request.get('profile')
}
