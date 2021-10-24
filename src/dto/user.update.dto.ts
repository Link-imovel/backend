interface updateUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  permissions: string;
  createdAt: Date;
  updatedAt: Date;
}

export default updateUserDto;
