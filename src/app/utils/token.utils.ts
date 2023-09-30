import jwt_decode from "jwt-decode";
import { User } from "../auth/data/user.model";
export const tokenKey = "access-token";

const getToken = () => {
  return localStorage.getItem(tokenKey);
};

const getUserFromToken = (token: string): User | null => {
  try {
    const decodedToken: any = jwt_decode(token);
    const { roles, username } = decodedToken;
    const user: User = { roles, username };
    return user;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

const isTokenExpired = (token: string) => {
  try {
    const decodedToken: any = jwt_decode(token);
    const currentTime = Date.now() / 1000; //convert to seconds;
    return decodedToken.exp < currentTime;
  } catch (ex) {
    console.log(ex);
    return true;
  }
};

export const tokenUtils = { getToken, isTokenExpired, getUserFromToken };
