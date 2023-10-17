export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
