import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../services/owner.service';
import { DecoraterService } from '../services/decorater.service';
import { Decorater } from '../models/Decorater';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  username: String = "";
  password: String = "";
  message: String = "";

  constructor(private router: Router, private ownerService: OwnerService, private decoraterService: DecoraterService, private appointmentService: AppointmentService) { }

  logIn() {
    this.ownerService.logIn(this.username, this.password).subscribe(
      data => {
        if (data != null) {
          if (data.activated == false) {
            this.message = "Налог није активиран"
            return;
          }
          localStorage.setItem("logged", JSON.stringify(data));
          this.router.navigate(['/owner'])
        } else {
          this.decoraterService.logIn(this.username, this.password).subscribe(
            data => {
              if (data != null) {
                if (data.activated == false) {
                  this.message = "Налог није активиран"
                  return;
                }
                this.appointmentService.getAllFinishedJobs(data.username).subscribe(
                  dataJobs => {
                    let today = new Date();
                    let yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    let shouldBlock = false;
                    for (let i = 0; i < dataJobs.length; i++) {
                      dataJobs[i].endDate = new Date(dataJobs[i].endDate)
                      if (dataJobs[i].endDate < yesterday) shouldBlock = true;
                    }
                    if (shouldBlock) {
                      this.decoraterService.blockAppointments(data).subscribe(
                        dataApp => {
                          localStorage.setItem("logged", JSON.stringify(data));
                          this.router.navigate(['/decorater'])
                          this.message = "Декоратер није унео слике на време"
                        }
                      )
                    } else {
                      localStorage.setItem("logged", JSON.stringify(data));
                      this.router.navigate(['/decorater'])
                    }
                  }
                )
              } else {
                this.message = "Шифра или корисничко име нису испарвно унети"
              }
            }
          )
        }
      }
    );
  }

  register() {
    this.router.navigate(['/register'])
  }

}
