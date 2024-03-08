import { request } from "../utils/request";

export async function queryProductList (
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
  return request.post('product/findAll', params)
}

export async function queryProductById(id:number) {
  return request.get(`product/findOne?id=${id}`)
}

export async function addProduct(
  body?: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/product/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function modifyProduct(
  params: {
    // path
    id?: string,
  },
  body?: any,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/product/update?id=${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    // params: { ...params },
    data: body,
    ...(options || {}),
  });
}

export async function deleteProduct (
  params: {
    // path
    /** userId */
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_string_>('product/remove', {
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
  // return request<API.Result_UserInfo_>('/product/upload', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: body,
  //   ...(options || {}),
  // });
  return request.post('/product/upload', params)
}
