export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  fullName: string;
}

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
