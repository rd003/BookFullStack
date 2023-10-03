import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      handleServerSideError(error);
      return throwError(() => error);
    })
  );
};

const handleServerSideError = (error: HttpErrorResponse) => {
  console.log(error);

  switch (error.status) {
    case 400:
      console.log("Bad Request, please try again later .");
      break;
    case 401:
      console.log("Unauthorized, please try again later.");
      break;
    case 403:
      console.log("Forbidden access is denied");
      break;
    case 404:
      console.log("Resource not found");
      break;
    case 500:
      console.log("Internal server error, please try again later.");
      break;
  }
};
