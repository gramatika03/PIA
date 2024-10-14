import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  logIn(username: String, password: String) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post<boolean>("http://localhost:4000/admins/login", data)
  }

  changePassword(username: String, passwordOld: String, passwordNew: String) {
    const data = {
      username: username,
      passwordOld: passwordOld,
      passwordNew: passwordNew
    }
    return this.http.post<boolean>("http://localhost:4000/admins/changePassword", data)
  }
}
