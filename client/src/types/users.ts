export interface Iuser {
  id: number;
  username: string;
  email: string;
  profile: IUserProfile;
  role: 'USER' | 'ADMIN';
}

export interface IUserProfile {
  id: number;
  fullname: string;
  phone?: string;
  address?: string;
  gender?: string;
  avatar?: string;
}
