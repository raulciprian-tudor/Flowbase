export interface CreateUserDto {
  email: string;
  name: string;
  displayName: string;
  password: string;
}

export interface UserDto {
  id: string;
  email: string;
  name: string;
  displayName: string | null;
  createdAt: Date;
  updatedAt: Date;
}
