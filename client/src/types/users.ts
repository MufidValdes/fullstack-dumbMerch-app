export interface Iuser {
  id: number;
  username: string;
  email: string;
  profile: IUserProfile;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
}
export enum Roles {
  USER,
  ADMIN,
}
export enum Gender {
  FEMALE,
  MALE,
}

export interface IUserProfile {
  id: number;
  fullname: string;
  phone: string;
  address: string;
  // gender: Gender;
  gender: string;
  avatar?: string;
  user: {
    email: string;
    username: string;
  };
}
