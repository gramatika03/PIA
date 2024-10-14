import { Component, OnInit } from '@angular/core';
import { FinishedJobs } from '../models/FinishedJobs';
import { Obligation } from '../models/Obligation';
import { Maintenence } from '../models/Maintenence';
import { AppointmentService } from '../services/appointment.service';
import { MaintenenceService } from '../services/maintenence.service';
import { Firm } from '../models/Firm';
import { Decorater } from '../models/Decorater';
import { FirmService } from '../services/firm.service';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-statistic-decorater',
  templateUrl: './statistic-decorater.component.html',
  styleUrls: ['./statistic-decorater.component.css']
})
export class StatisticDecoraterComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private maintenenceService: MaintenenceService, private firmService: FirmService, private router: Router) { }

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

  finishedJobs: FinishedJobs[] = []
  obligations: Obligation[] = []
  maintenences: Maintenence[] = []
  firm: Firm = new Firm();
  decorater: Decorater = new Decorater();
  dataFirst: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  dataFirstMonths: String[] = ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"]
  dataSecondName: String[] = []
  dataSecondNumbers: number[] = []
  dataThirdDays: String[] = ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота']
  dataThirdValues: number[] = [0, 0, 0, 0, 0, 0, 0]
  nameToNumber: { [key: string]: number } = {}

  ngOnInit(): void {

    let user = localStorage.getItem("logged");
    if (user) {
      this.decorater = JSON.parse(user);
    }

    this.firmService.getFirmByWorker(this.decorater.username).subscribe(
      data => {
        if (data) this.firm = data;
        this.appointmentService.getObligationsDataByFirm(this.firm.name).subscribe(
          data => {
            if (data) this.obligations = data;
            this.appointmentService.getFinishedJobsDataByFirm(this.firm.name).subscribe(
              data => {
                if (data) this.finishedJobs = data
                this.maintenenceService.getDataByFirm(this.firm.name).subscribe(
                  data => {
                    if (data) this.maintenences = data;
                    this.fillData();
                    this.createCharts();
                  }
                )
              }
            )
          }
        )
      }
    )
    Chart.register(...registerables);


  }

  fillData() {
    for (let i = 0; i < this.finishedJobs.length; i++) {
      if (this.finishedJobs[i].username == this.decorater.username) {
        let date = new Date(this.finishedJobs[i].endDate)
        let month = date.getMonth()
        this.dataFirst[month] = this.dataFirst[month] + 1
      }
    }
    for (let i = 0; i < this.maintenences.length; i++) {
      let date = new Date(this.finishedJobs[i].endDate)
      let month = date.getMonth()
      let year = date.getFullYear()
      if (this.maintenences[i].username == this.decorater.username && year > 1) {
        this.dataFirst[month] = this.dataFirst[month] + 1
      }
    }

    for (let i = 0; i < this.finishedJobs.length; i++) {
      if (this.finishedJobs[i].username.toString() in this.nameToNumber) {
        this.nameToNumber[this.finishedJobs[i].username.toString()] = this.nameToNumber[this.finishedJobs[i].username.toString()] + 1
      } else {
        this.nameToNumber[this.finishedJobs[i].username.toString()] = 1
      }
    }

    for (let i = 0; i < this.maintenences.length; i++) {
      let date = new Date(this.finishedJobs[i].endDate)
      let year = date.getFullYear()
      if (year == 1) continue;
      if (this.maintenences[i].username && this.maintenences[i].username.toString() in this.nameToNumber) {
        this.nameToNumber[this.maintenences[i].username.toString()] = this.nameToNumber[this.maintenences[i].username.toString()] + 1
      } else if(this.maintenences[i].username){
        this.nameToNumber[this.maintenences[i].username.toString()] = 1
      }
    }


    for (const key in this.nameToNumber) {
      this.dataSecondName.push(key);
      this.dataSecondNumbers.push(this.nameToNumber[key]);
    }

    let today = new Date();
    let twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(today.getFullYear() - 2);

    for (let i = 0; i < this.finishedJobs.length; i++) {
      let date = new Date(this.finishedJobs[i].endDate)
      let day = date.getDay()
      if (this.finishedJobs[i].endDate < twoYearsAgo) continue;
      this.dataThirdValues[day] = this.dataThirdValues[day] + 1;
    }

    for (let i = 0; i < this.maintenences.length; i++) {
      let date = new Date(this.finishedJobs[i].endDate)
      let day = date.getDay()
      let year = date.getFullYear()
      if (this.maintenences[i].endDate < twoYearsAgo) continue;
      if (year == 1) continue;
      this.dataThirdValues[day] = this.dataThirdValues[day] + 1;
    }
  }

  createCharts() {
    const ctx1 = document.getElementById('jobsPerMonth') as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: this.dataFirstMonths,
        datasets: [{
          label: 'Рад по месецима',
          data: this.dataFirst,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const canvas2 = document.getElementById('jobsPerDecorater') as HTMLCanvasElement | null;
    if (canvas2) {
      const ctx = canvas2.getContext('2d');
      if (ctx) {
        const data: ChartData<'pie'> = {
          labels: this.dataSecondName,
          datasets: [{
            label: "Рад по раднику",
            data: this.dataSecondNumbers,
            hoverOffset: 5
          }]
        };
        const config: ChartConfiguration<'pie', number[], unknown> = {
          type: 'pie',
          data: data,
          options: {
            responsive: false
          }
        };
        new Chart(ctx, config);
      }
    }

    const ctx3 = document.getElementById('jobsPerDay') as HTMLCanvasElement;
    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: this.dataThirdDays,
        datasets: [{
          label: 'Рад по данима',
          data: this.dataThirdValues,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
