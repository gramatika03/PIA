import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { FinishedJobs } from '../models/FinishedJobs';
import { Appointment } from '../models/Appointment';
import { Obligation } from '../models/Obligation';
import { Owner } from '../models/Owner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-appointment',
  templateUrl: './owner-appointment.component.html',
  styleUrls: ['./owner-appointment.component.css']
})
export class OwnerAppointmentComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  chosenMenu(i: number) {
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
      this.owner = JSON.parse(user);
    }

    this.appointmentService.getAllAppointmentsOwner(this.owner.username).subscribe(
      data => {
        this.appointments = data;
        let today = new Date();
        this.tomorrow = new Date();
        this.tomorrow.setDate(today.getDate() + 1)
        for (let i = 0; i < this.appointments.length; i++) {
          this.appointments[i].startDate = new Date(this.appointments[i].startDate)
          if (this.appointments[i].startDate > this.tomorrow) this.canCancle[i] = true
          else this.canCancle[i] = false
        }
      }
    )

    this.appointmentService.getAllFinishedJobsOwner(this.owner.username).subscribe(
      data => {
        this.finishedJobs = data;
        for (let i = 0; i < this.finishedJobs.length; i++) {
          this.addComment[i] = false;
          this.comments[i] = ""
        }
      }
    )

    this.appointmentService.getAllObligationsOwner(this.owner.username).subscribe(
      data => {
        this.obligations = data;
      }
    )


  }

  finishedJobs: FinishedJobs[] = []
  appointments: Appointment[] = []
  obligations: Obligation[] = []
  owner: Owner = new Owner()
  addComment: boolean[] = []
  comments: String[] = []
  ratings: number[] = []
  message: String = ""
  tomorrow: Date = new Date();
  canCancle: boolean[] = []

  comment(i: number) {
    this.addComment[i] = !this.addComment[i]
  }

  saveChanges(i: number) {
    if (this.ratings[i] == -1) {
      this.message = "Морате изабрати оцену"
      return;
    }

    this.finishedJobs[i].rating = this.rating
    this.finishedJobs[i].commentOwner = this.comments[i]

    this.appointmentService.updateFinishedJob(this.finishedJobs[i]).subscribe(
      data => {
        if (!data) this.ngOnInit()
      }
    )
  }

  removeAppointment(i: number) {
    this.appointmentService.removeAppointment(this.appointments[i]).subscribe(
      data => {
        if (data) this.ngOnInit();
      }
    )
  }


  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: boolean[] = Array(5).fill(false);
  hoverRating: number = 0;

  rate(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }

  hover(rating: number): void {
    this.hoverRating = rating;
  }

  leave(): void {
    this.hoverRating = 0;
  }

  getStars(rating: number): string[] {
    if(rating == -1) rating = 0;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('full'),
      ...Array(halfStar).fill('half'),
      ...Array(emptyStars).fill('empty')
    ];
  }

}
