declare namespace API {
  type UserGenderEnum = 'MALE' | 'FEMALE';
  
  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
  }

  interface RoleInfo {
    id?: string;
    title?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    access?: any[];
  }
}

