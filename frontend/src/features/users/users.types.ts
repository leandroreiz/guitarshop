export type TUser = {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

export interface IUserState {
  isLoading: boolean;
  userData: Array<TUser>;
  error?: string | unknown;
}

export interface IUserActionAttributes {
  email: string;
  password: string;
}
