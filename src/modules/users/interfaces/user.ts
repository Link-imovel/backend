interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  registry: string;
  creci: string;
  birthday: Date;
  permissionLevel: string;
  isActivate: boolean;
}

interface LoginUser {
  email: string;
  password: string;
}

interface UpdatePasswordUser {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordUser {
  email: string;
}

interface UpdateUser extends Partial<CreateUser> {
  password?: string;
}

export type {
  CreateUser,
  UpdateUser,
  LoginUser,
  UpdatePasswordUser,
  ResetPasswordUser,
};
