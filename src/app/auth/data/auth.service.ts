import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel, LoginResponse } from "./login.model";

@Injectable({ providedIn: "root" })
export class LoginService {
  // private readonly _url = environment.apiBaseUrl + '/auth';
  private readonly _http = inject(HttpClient);
  // http://localhost:3000/auth/login
  // login(loginData: LoginModel) {
  //   return this._http.post<LoginResponse>(
  //     'http://localhost:3000/auth/login',
  //     loginData
  //   );
  // }

  login() {
    // const loginData = {
    //   username: 'ravindra',
    //   password: 'Ravindra@123',
    // };
  }
}
