import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Decorater } from '../models/Decorater';
import { Job } from '../models/Job';

@Injectable({
  providedIn: 'root'
})
export class DecoraterService {

  constructor(private http: HttpClient) { }

  logIn(username: String, password: String) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post<Decorater>("http://localhost:4000/decoraters/login", data);
  }

  getAll() {
    return this.http.post<Decorater[]>("http://localhost:4000/decoraters/getAll", null);
  }

  saveChanges(decorater: Decorater) {
    return this.http.post<boolean>("http://localhost:4000/decoraters/saveChanges", decorater);
  }

  deactivate(decorater: Decorater) {
    return this.http.post<boolean>("http://localhost:4000/decoraters/deactivate", decorater);
  }

  blockAppointments(decorater: Decorater) {
    return this.http.post<boolean>("http://localhost:4000/decoraters/blockAppointment", decorater);
  }

  allowAppointments(decorater: Decorater) {
    return this.http.post<boolean>("http://localhost:4000/decoraters/allowAppointment", decorater);
  }

  addNew(decorater: Decorater) {
    return this.http.post<boolean>("http://localhost:4000/decoraters/addNew", decorater);
  }

  addJob(username: String, firm: String) {
    const data = {
      username: username,
      firmName: firm
    }
    return this.http.post<boolean>("http://localhost:4000/decoraters/addJob", data);
  }

  changePassword(username: String, passwordOld: String, passwordNew: String) {
    const data = {
      username: username,
      passwordOld: passwordOld,
      passwordNew: passwordNew
    }
    return this.http.post<boolean>("http://localhost:4000/decoraters/changePassword", data)
  }

  getAllJobsData() {
    return this.http.post<Job[]>("http://localhost:4000/decoraters/getAllJobsData", null)
  }

}
