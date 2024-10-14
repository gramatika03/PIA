import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Owner } from '../models/Owner';
import { FinishedJobs } from '../models/FinishedJobs';
import { Maintenence } from '../models/Maintenence';
import { MaintenenceService } from '../services/maintenence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-maintenence',
  templateUrl: './owner-maintenence.component.html',
  styleUrls: ['./owner-maintenence.component.css']
})
export class OwnerMaintenenceComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private maintenenceService: MaintenenceService, private router: Router) { }

  chosen(i: number) {
    if (i == 0) {
      this.router.navigate(['/owner'])
    } else if (i == 1) {
      this.router.navigate(['/ownerFirms'])
    } else if (i == 2) {
      this.router.navigate(['/ownerAppointment'])
    } else {
      this.router.navigate(['/ownerMaintenence'])
    }
  }

  ngOnInit(): void {
    let user = localStorage.getItem("logged")
    if (user) {
      this.owner = JSON.parse(user)
    }

    this.appointmentService.getAllFinishedJobsOwner(this.owner.username).subscribe(
      data => {
        this.finishedJobs = data
        for (let i = 0; i < this.finishedJobs.length; i++) {
          this.finishedJobs[i].endDate = new Date(this.finishedJobs[i].endDate)
          this.sixthMonth[i] = new Date(this.finishedJobs[i].endDate)
          this.sixthMonth[i].setMonth(this.sixthMonth[i].getMonth() + 6)
          let sixthMaintained = new Date(this.finishedJobs[i].lastMaintained)
          sixthMaintained.setMonth(sixthMaintained.getMonth() + 6)
          if (sixthMaintained > this.sixthMonth[i]) this.sixthMonth[i] = sixthMaintained
        }
      }
    )

    this.maintenenceService.getAllOwner(this.owner.username).subscribe(
      data => {
        this.maintenences = data
      }
    )
  }

  owner: Owner = new Owner()
  finishedJobs: FinishedJobs[] = []
  maintenences: Maintenence[] = []
  sixthMonth: Date[] = []
  today: Date = new Date()
  endDate: Date = new Date();

  makeMaintenence(i: number) {
    let maintenence = new Maintenence();
    maintenence.owner = this.owner.username;
    maintenence.firm = this.finishedJobs[i].firm;
    maintenence.endDate = this.endDate;
    maintenence.working = false;
    maintenence.finishedJobId = this.finishedJobs[i]._id
    maintenence.username = this.owner.username
    this.finishedJobs[i].lastMaintained = this.today
    this.appointmentService.updateFinishedJob(this.finishedJobs[i]).subscribe(
      data => {
        this.ngOnInit()
      }
    )
    this.maintenenceService.addNew(maintenence).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

}
