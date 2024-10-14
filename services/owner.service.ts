import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Owner } from '../models/Owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  logIn(username: String, password: String) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post<Owner>("http://localhost:4000/owners/login", data);
  }

  getAll() {
    return this.http.post<Owner[]>("http://localhost:4000/owners/getAll", null);
  }

  saveChanges(owner: Owner) {
    return this.http.post<boolean>("http://localhost:4000/owners/saveChanges", owner);
  }

  deactivate(owner: Owner) {
    return this.http.post<boolean>("http://localhost:4000/owners/deactivate", owner);
  }

  acceptRequest(request: Owner) {
    return this.http.post<boolean>("http://localhost:4000/owners/acceptRequest", request);
  }

  denyRequest(request: Owner) {
    return this.http.post<boolean>("http://localhost:4000/owners/denyRequest", request);
  }

  getAllRequests() {
    return this.http.post<Owner[]>("http://localhost:4000/owners/getAllRequests", null);
  }

  register(username: String, password: String, firstname: String, lastName: String, gender: Number,
    address: String, phoneNumber: String, email: String, picture: String, creditCardNumber: String, type: Number) {
      let owner = new Owner();
      owner.username = username;
      owner.password = password;
      owner.firstname = firstname;
      owner.lastname = lastName;
      owner.gender = gender;
      owner.address = address;
      owner.phoneNumber = phoneNumber;
      owner.email = email;
      owner.picture = picture;
      owner.creditCardNumber = creditCardNumber;
      owner.type = 1;

      return this.http.post<boolean>("http://localhost:4000/owners/register", owner)
  }

  changePassword(username: String, passwordOld: String, passwordNew: String) {
    const data = {
      username: username,
      passwordOld: passwordOld,
      passwordNew: passwordNew
    }
    return this.http.post<boolean>("http://localhost:4000/owners/changePassword", data)
  }

}
