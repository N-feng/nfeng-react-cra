import { request } from "../../utils/request";

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

export async function profile () {
  return request.get('profile')
}
