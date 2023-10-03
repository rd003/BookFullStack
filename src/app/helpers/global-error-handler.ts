import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.log(error);
  }
}

// const handleError = (error: any) => {
//   console.log(error);
//   const snackBar = inject(MatSnackBar);
//   snackBar.open("something went wrong", "dismiss", {
//     duration: 1000,
//   });
// };
