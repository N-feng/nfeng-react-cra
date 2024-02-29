import { request } from "../utils/request";

export async function login (
  params: {
    username: string;
    password: string;
  },
) {
  return request.post('login', params)
}

export async function profile () {
  return request.get('profile')
}

export async function doAuth (
  params: {
    roleId: string;
    accessIds: string[];
  },
) {
  return request.post('doAuth', params)
}