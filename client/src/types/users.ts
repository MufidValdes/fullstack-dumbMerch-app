export interface Iuser {
  id: number;
  username: string;
  email: string;
  profile: IUserProfile;
}

export interface IUserProfile {
  id: number;
  fullname: string;
  phone?: string;
  address?: string;
  gender?: string;
  avatar?: string;
}
