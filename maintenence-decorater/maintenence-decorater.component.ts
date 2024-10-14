import { Component, OnInit } from '@angular/core';
import { MaintenenceService } from '../services/maintenence.service';
import { Maintenence } from '../models/Maintenence';
import { Decorater } from '../models/Decorater';
import { Firm } from '../models/Firm';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenence-decorater',
  templateUrl: './maintenence-decorater.component.html',
  styleUrls: ['./maintenence-decorater.component.css']
})
export class MaintenenceDecoraterComponent implements OnInit{

  constructor(private service: MaintenenceService, private firmService: FirmService, private router: Router) {}

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

    let user = localStorage.getItem("logged");
    if(user) {
      this.decorater = JSON.parse(user);
    }

    this.firmService.getFirmByWorker(this.decorater.username).subscribe(
      data => {
        this.firm = data;
        this.service.getAll(this.firm.name).subscribe(
          data => {
            this.maintenences = data;
          }
        )
      }
    )
  }

  maintenences: Maintenence[] = []
  decorater: Decorater = new Decorater()
  firm: Firm = new Firm()

  accept(maintenence: Maintenence) {
    maintenence.working = true;
    maintenence.username = this.decorater.username
    this.service.accept(maintenence).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

  deny(maintenence: Maintenence) {
    this.service.deny(maintenence).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

}
