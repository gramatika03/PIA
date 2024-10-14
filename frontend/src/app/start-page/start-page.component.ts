import { Component } from '@angular/core';
import { Firm } from '../models/Firm';
import { Decorater } from '../models/Decorater';
import { FinishedJobs } from '../models/FinishedJobs';
import { Owner } from '../models/Owner';
import { Appointment } from '../models/Appointment';
import { Job } from '../models/Job';
import { DecoraterService } from '../services/decorater.service';
import { OwnerService } from '../services/owner.service';
import { AppointmentService } from '../services/appointment.service';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {

  constructor(private decoraterService: DecoraterService, private ownerService: OwnerService,
    private appointmentService: AppointmentService, private firmService: FirmService,
    private router: Router
  ) { }

  prijava() {
    this.router.navigate(['/loginUser'])
  }

  ngOnInit(): void {
    this.ownerService.getAll().subscribe(
      data => {
        this.owners = data;
        this.ownersNumber = this.owners.length
      }
    )

    this.decoraterService.getAll().subscribe(
      data => {
        this.decoraters = data;
        this.decoratersNumber = this.decoraters.length
      }
    )

    this.firmService.getAll().subscribe(
      data => {
        this.firms = data;
        this.decoraterService.getAllJobsData().subscribe(
          data => {
            this.jobs = data;
            this.fillFirmWorkers();
          }
        )
      }
    )

    this.appointmentService.getAllApointmentsData().subscribe(
      data => {
        this.appointments = data;
        let today = new Date();
        let yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        let lastWeek = new Date(today)
        lastWeek.setDate(today.getDate() - 7)
        let lastMonth = new Date();
        lastMonth.setMonth(today.getMonth() - 1)
        for (let i = 0; i < this.appointments.length; i++) {
          this.appointments[i].made = new Date(this.appointments[i].made)
          if (this.appointments[i].made >= yesterday) this.jobsLastDay = this.jobsLastDay + 1
          if (this.appointments[i].made >= lastWeek) this.jobsLastWeek = this.jobsLastWeek + 1
          if (this.appointments[i].made >= lastMonth) this.jobsLastMonth = this.jobsLastMonth + 1
        }
      }
    )

    this.appointmentService.getAllFinishedJobsData().subscribe(
      data => {
        this.finishedJobs = data;
        this.decoratedGardens = this.finishedJobs.length
        this.fillGallery()
      }
    )

  }

  fillGallery() {
    for(let i = 0; i < this.finishedJobs.length; i++) {
      this.finishedJobs[i].endDate = new Date(this.finishedJobs[i].endDate)
    }

    for(let i = 0; i < this.finishedJobs.length; i++) {
      for(let j = i + 1; j < this.finishedJobs.length; j++) {
        if(this.finishedJobs[i].endDate < this.finishedJobs[i].endDate) {
          let temp = this.finishedJobs[i]
          this.finishedJobs[i] = this.finishedJobs[j]
          this.finishedJobs[j] = temp
        }
      }
    }

    for(let i = 0; i < Math.min(this.finishedJobs.length, 3); i++) {
      this.gallery.push(this.finishedJobs[i])
    }
  }

  getDecoraterWithUsername(username: String) {
    for(let i = 0; i < this.decoraters.length; i++) {
      if(this.decoraters[i].username == username) return this.decoraters[i]
    }
    return new Decorater()
  }

  fillFirmWorkers() {
    for (let i = 0; i < this.jobs.length; i++) {
      let firmName = this.jobs[i].firmName.toString()
      let workerName = this.jobs[i].username.toString();
      if (firmName in this.workers) {
        this.workers[firmName].push(this.getDecoraterWithUsername(workerName))
      } else {
        this.workers[firmName] = [this.getDecoraterWithUsername(workerName)]
      }
    }

    for (let i = 0; i < this.firms.length; i++) {
      let name = this.firms[i].name.toString()
      if (!(name in this.workers)) {
        this.workers[name] = []
      }
    }
  }

  owners: Owner[] = []
  decoraters: Decorater[] = [];
  firms: Firm[] = []
  appointments: Appointment[] = []
  finishedJobs: FinishedJobs[] = []
  jobs: Job[] = []
  workers: { [key: string]: Decorater[] } = {}

  decoratedGardens: Number = 0;
  ownersNumber: Number = 0;
  decoratersNumber: Number = 0;
  jobsLastDay: number = 0;
  jobsLastWeek: number = 0;
  jobsLastMonth: number = 0;

  selectedSort: Number = 1;
  selectedType: Number = 1;

  searchedFirms: Number[] = [];
  searchName: String = "";
  searchAddress: String = "";

  gallery: FinishedJobs[] = []

  sort() {
    let tempFirm;
    for (let i = 0; i < this.firms.length; i++) {
      for (let j = i + 1; j < this.firms.length; j++) {
        if (this.selectedType == 1) {
          if (this.firms[i].name.localeCompare(this.firms[j].name.toString()) > 0) {
            tempFirm = this.firms[i];
            this.firms[i] = this.firms[j];
            this.firms[j] = tempFirm;
          }
        } else {
          if (this.firms[i].address.localeCompare(this.firms[j].address.toString()) > 0) {
            tempFirm = this.firms[i];
            this.firms[i] = this.firms[j];
            this.firms[j] = tempFirm;
          }
        }
      }
    }
    if (this.selectedSort == 2) this.firms.reverse();
    this.search();
  }

  search() {
    this.searchedFirms = [];
    for (let i = 0; i < this.firms.length; i++) {
      if (this.searchName != "" && this.searchAddress != "") {
        if (this.firms[i].name.toLowerCase().includes(this.searchName.toString().toLowerCase()) &&
          this.firms[i].address.toLowerCase().includes(this.searchAddress.toString().toLowerCase())) {
          this.searchedFirms.push(i);
        }
      } else if (this.searchName != "") {
        if (this.firms[i].name.toLowerCase().includes(this.searchName.toLowerCase().toString())) {
          this.searchedFirms.push(i);
        }
      } else if (this.searchAddress != "") {
        if (this.firms[i].address.toLowerCase().includes(this.searchAddress.toLowerCase().toString())) {
          this.searchedFirms.push(i);
        }
      }
    }
  }

}
