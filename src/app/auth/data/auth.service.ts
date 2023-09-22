import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel, LoginResponse } from "./login.model";
import { environment } from "src/environments/environment.development";

@Injectable({ providedIn: "root" })
export class LoginService {
  private readonly _url = environment.apiBaseUrl;
  private readonly _http = inject(HttpClient);

  login(loginData: LoginModel) {
    return this._http.post<any>(this._url + "/login", loginData);
  }
}
