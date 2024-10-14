import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Decorater } from '../models/Decorater';
import { Firm } from '../models/Firm';
import { Appointment } from '../models/Appointment';
import { FirmService } from '../services/firm.service';
import { Obligation } from '../models/Obligation';
import { FinishedJobs } from '../models/FinishedJobs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointemnt-decorater',
  templateUrl: './appointemnt-decorater.component.html',
  styleUrls: ['./appointemnt-decorater.component.css']
})
export class AppointemntDecoraterComponent implements OnInit {

  constructor(private service: AppointmentService, private firmService: FirmService, private router: Router) { }

  chosen(i: number) {
    if (i == 0) {
      this.router.navigate(['/decorater'])
    } else if (i == 1) {
      this.router.navigate(['/decoraterAppointment'])
    } else if (i == 2) {
      this.router.navigate(['/maintenence'])
    } else {
      this.router.navigate(['/statisticDecorater'])
    }
  }

  ngOnInit(): void {
    this.obligations = []
    this.finishedJobs = []
    this.comments = []
    this.appointments = []

    let item = localStorage.getItem("logged");
    if (item) {
      this.decorater = JSON.parse(item);
    }

    this.firmService.getFirmByWorker(this.decorater.username).subscribe(
      data => {
        this.firm = data;
        this.service.getAllApointments(this.firm.name).subscribe(
          data => {
            this.appointments = data;
            for (let i = 0; i < this.appointments.length; i++) {
              this.comments[i] = ""
              for (let j = i + 1; j < this.appointments.length; j++) {
                if (this.appointments[i].startDate > this.appointments[j].startDate) {
                  let appTemp = this.appointments[i];
                  this.appointments[i] = this.appointments[j];
                  this.appointments[j] = appTemp
                }
              }
            }
          }
        )
        this.service.getAllObligations(this.decorater.username).subscribe(
          data => {
            for(let i = 0; i < data.length; i++) {
              data[i].startDate = new Date(data[i].startDate)
              data[i].endDate = new Date(data[i].endDate)
            }
            this.obligations = data
          }
        )
      }
    )

    this.service.getAllFinishedJobs(this.decorater.username).subscribe(
      data => {
        this.finishedJobs = data;
      }
    )

  }

  decorater: Decorater = new Decorater();
  firm: Firm = new Firm();
  appointments: Appointment[] = []
  endDate: Date = new Date()
  obligations: Obligation[] = []
  finishedJobs: FinishedJobs[] = []
  comments: String[] = []

  accept(appointment: Appointment, i: number) {
    this.endDate = new Date(this.endDate)
    this.service.acceptAppointment(appointment, this.decorater.username, this.endDate, this.comments[i]).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

  deny(appointemnt: Appointment, i: Number) {
    if (this.comments[i.valueOf()] == "") {
      return;
    }
    this.service.denyAppointment(appointemnt).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

  finishJob(obligation: Obligation) {
    this.service.finishJob(obligation).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

  addedPhoto(event: any, i: Number) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            if ((img.width <= 300 && img.height <= 300) && (img.width >= 100 && img.height >= 100)) {
              this.finishedJobs[i.valueOf()].pictures.push(reader.result as string);
            }
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  savePhotos(i: Number) {
    this.service.savePhotos(this.finishedJobs[i.valueOf()]).subscribe(
      data => {
        
      }
    );
  }

}
