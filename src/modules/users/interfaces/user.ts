interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  mobile: string;
  registry: string;
  creci: string;
  birthday: Date;
  permissionLevel: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface UpdatePasswordUser {
  password: string;
  confirmPassword: string;
}

type UpdateUser = Partial<CreateUser>;

export type { CreateUser, UpdateUser, LoginUser, UpdatePasswordUser };
