export interface IUserState {
  isLoading: boolean;
  userData: TUser | null;
  error?: string | unknown;
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
};
