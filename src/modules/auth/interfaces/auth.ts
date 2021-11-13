import { User } from 'src/entities/user.entity';

interface LoginResponse {
  access_token: string;
  user: User;
}

export type { LoginResponse };
