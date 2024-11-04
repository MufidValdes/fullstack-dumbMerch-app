export interface Iuser {
  id: number;
  username: string;
  email: string;
  profile: IUserProfile;
  role: 'USER' | 'ADMIN';
}
export enum Roles {
  USER,
  ADMIN,
}

export interface IUserProfile {
  id: number;
  fullname: string;
  phone: string;
  address: string;
  gender: string;
  avatar?: string;
  user: {
    email: string;
    username: string;
  };
}
