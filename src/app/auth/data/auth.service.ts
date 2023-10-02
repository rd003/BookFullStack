import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel, LoginResponse } from "./login.model";
import { environment } from "src/environments/environment.development";
import { delay } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly _url = environment.apiBaseUrl;
  private readonly _http = inject(HttpClient);

  login(loginData: LoginModel) {
    return this._http.post<LoginResponse>(this._url + "/login", loginData);
  }
}
