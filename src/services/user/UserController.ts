import { request } from "../../utils/request";

export async function queryUserList (
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
  return request.post('users/findAll',  params)
}