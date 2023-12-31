import { HttpHeaders, HttpInterceptorFn } from "@angular/common/http";
import { tokenKey } from "../utils/token.utils";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(tokenKey);
  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authRequest);
};
