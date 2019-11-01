import { post } from "./requests";

interface Login {
  username: string;
  password: string;
}

export const login = (credentials: Login) =>
  post("/api/v1/auth/login", credentials);
