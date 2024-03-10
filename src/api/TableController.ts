import { request } from "../utils/request";

export async function queryTableList (
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
  return request.post('table/findAll', params)
}

export async function queryTableById(id:number) {
  return request.get(`table/findOne/${id}`)
}

export async function showTableCode(id:number) {
  return request.get(`table/showCode?id=${id}`)
}

export async function addTable(
  body?: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/table/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function queryTableOptions() {
  return request.get('table/options')
}

export async function modifyTable(
  params: {
    // path
    id?: string,
  },
  body?: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/table/update?id=${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    // params: { ...params },
    data: body,
    ...(options || {}),
  });
}

export async function deleteTable (
  params: {
    // path
    /** userId */
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_string_>('table/remove', {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}

export async function uploadFile(
  // body?: any,
  // options?: { [key: string]: any },
  params: any
) {
  // return request<API.Result_UserInfo_>('/table/upload', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: body,
  //   ...(options || {}),
  // });
  return request.post('/table/upload', params)
}
