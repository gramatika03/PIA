import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Appointment } from '../models/Appointment';
import { FinishedJobs } from '../models/FinishedJobs';
import { Obligation } from '../models/Obligation';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAllApointments(firm: String) {
    const data = {
      firm: firm
    }
    return this.http.post<Appointment[]>("http://localhost:4000/appointments/getAll", data);
  }

  getAllApointmentsData() {
    return this.http.post<Appointment[]>("http://localhost:4000/appointments/getAllAppointmentsData", null);
  }

  getAllFinishedJobsData() {
    return this.http.post<FinishedJobs[]>("http://localhost:4000/appointments/getAllFinishedJobsData", null);
  }

  getAllObligations(username: String) {
    const data = {
      username: username
    }
    return this.http.post<Obligation[]>("http://localhost:4000/appointments/getAllObligations", data);
  }

  getAllFinishedJobs(username: String) {
    const data = {
      username: username
    }
    return this.http.post<FinishedJobs[]>("http://localhost:4000/appointments/getAllFinishedJobs", data);
  }

  acceptAppointment(appointment: Appointment, username: String, endDate: Date, comment: String) {
    const data = {
      username: username,
      appointment: appointment,
      endDate: endDate,
      comment: comment
    }
    return this.http.post<boolean>("http://localhost:4000/appointments/acceptAppointment", data);
  }

  denyAppointment(appointemnt: Appointment) {
    return this.http.post<boolean>("http://localhost:4000/appointments/denyAppointment", appointemnt);
  }

  savePhotos(finishedJob: FinishedJobs) {
    return this.http.post<boolean>("http://localhost:4000/appointments/savePhotos", finishedJob);
  }

  finishJob(obligation: Obligation) {
    return this.http.post<boolean>("http://localhost:4000/appointments/finishJob", obligation);
  }

  getObligationsDataByFirm(firm: String) {
    const data = {
      firm: firm
    }
    return this.http.post<Obligation[]>("http://localhost:4000/appointments/getObligationsDataByFirm", data);
  }

  getFinishedJobsDataByFirm(firm: String) {
    const data = {
      firm: firm
    }
    return this.http.post<FinishedJobs[]>("http://localhost:4000/appointments/getFinishedJobsDataByFirm", data);
  }

  addAppointment(appointemnt: Appointment) {
    const data = {
      appointemnt: appointemnt
    }
    return this.http.post<boolean>("http://localhost:4000/appointments/addAppointment", data);
  }

  getAllAppointmentsOwner(username: String) {
    const data = {
      username: username
    }
    return this.http.post<Appointment[]>("http://localhost:4000/appointments/getAllAppointmentsOwner", data);
  }

  getAllFinishedJobsOwner(username: String) {
    const data = {
      username: username
    }
    return this.http.post<FinishedJobs[]>("http://localhost:4000/appointments/getAllFinishedJobsOwner", data);
  }

  getAllObligationsOwner(username: String) {
    const data = {
      username: username
    }
    return this.http.post<Obligation[]>("http://localhost:4000/appointments/getAllObligationsOwner", data);
  }

  updateFinishedJob(finishedJob: FinishedJobs) {
    const data = {
      finishedJob: finishedJob
    }
    return this.http.post<boolean>("http://localhost:4000/appointments/updateFinishedJob", data);
  }

  removeAppointment(appointemnt: Appointment) {
    const data = {
      appointemnt: appointemnt
    }
    return this.http.post<boolean>("http://localhost:4000/appointments/removeAppointment", data);
    
  }

}
