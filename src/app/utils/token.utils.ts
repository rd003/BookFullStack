import jwt_decode from "jwt-decode";
export const tokenKey = "access-token";

const getToken = () => {
  return localStorage.getItem(tokenKey);
};

const getUserFromToken = (token: string) => {
  try {
    const decodedToken: any = jwt_decode(token);
    return decodedToken.user;
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
