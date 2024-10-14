import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maintenence } from '../models/Maintenence';

@Injectable({
  providedIn: 'root'
})
export class MaintenenceService {

  constructor(private http: HttpClient) { }

  getAll(firm: String) {
    const data = {
      firm: firm
    }
    return this.http.post<Maintenence[]>("http://localhost:4000/maintenence/getAll", data);
  }

  accept(maintenence: Maintenence) {
    return this.http.post<boolean>("http://localhost:4000/maintenence/accept", maintenence);
  }

  deny(maintenence: Maintenence) {
    return this.http.post<boolean>("http://localhost:4000/maintenence/deny", maintenence);
  }

  getDataByFirm(firm: String) {
    const data = {
      firm: firm
    }
    return this.http.post<Maintenence[]>("http://localhost:4000/maintenence/getDataByFirm", data);
  }

  getAllOwner(owner: String) {
    const data = {
      owner: owner
    }
    return this.http.post<Maintenence[]>("http://localhost:4000/maintenence/getAllOwner", data);
  }

  addNew(maintenence: Maintenence) {
    const data = {
      maintenence: maintenence
    }
    return this.http.post<Maintenence[]>("http://localhost:4000/maintenence/addNew", data);
  }

}
