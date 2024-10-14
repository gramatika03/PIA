import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firm } from '../models/Firm';

@Injectable({
  providedIn: 'root'
})
export class FirmService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.post<Firm[]>("http://localhost:4000/firms/getAll", null);
  }

  add(firm: Firm) {
    return this.http.post<boolean>("http://localhost:4000/firms/add", firm);
  }

  getFirmByWorker(username: String) {
    const data = {
      username: username
    }
    return this.http.post<Firm>("http://localhost:4000/firms/getFirmByWorker", data);
  }
}
