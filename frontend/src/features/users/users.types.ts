export interface IUserState {
  isLoading: boolean;
  userData: TUser | null;
  error?: string | unknown;
  success?: boolean;
}

export interface IUserActionAttributes {
  name?: string;
  email: string;
  password: string;
}

export type TUser = {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  token?: string;
  _id?: string;
};
