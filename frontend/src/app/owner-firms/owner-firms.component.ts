import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FirmService } from '../services/firm.service';
import { Firm } from '../models/Firm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-firms',
  templateUrl: './owner-firms.component.html',
  styleUrls: ['./owner-firms.component.css']
})

export class OwnerFirmsComponent implements OnInit {

  constructor(private firmService: FirmService, private router: Router) { }

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
    this.firmService.getAll().subscribe(
      data => {
        this.firms = data;
        for (let i = 0; i < this.firms.length; i++) {
          this.chosenFirm[i] = false;
          if (this.firms[i].numberOfRates.valueOf() > 0)
            this.firmRatings[i] = this.firms[i].ratings.valueOf() / this.firms[i].numberOfRates.valueOf()
          else this.firmRatings[i] = 0;
        }
      }
    )
  }

  firms: Firm[] = []
  searchedFirms: Number[] = []
  searchName: String = ""
  searchAddress: String = ""
  chosenFirm: boolean[] = []
  firmRatings: number[] = []
  firmRatingsSearched: number[] = []

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
    for (let i = 0; i < this.searchedFirms.length; i++) {
      this.firmRatingsSearched[i] = this.firmRatings[this.searchedFirms[i].valueOf()]
    }
  }

  chosen(i: number) {
    for (let j = 0; j < this.firms.length; j++) {
      if (this.chosenFirm[j] && i == j) {
        this.chosenFirm[j] = false;
        return;
      }
    }

    for (let i = 0; i < this.firms.length; i++) {
      this.chosenFirm[i] = false;
    }

    this.chosenFirm[i] = true;
  }

  goToFirm(i: Number) {
    localStorage.setItem("firm", JSON.stringify(this.firms[i.valueOf()]))
    this.router.navigate(['/firm'])
  }

  getStars(rating: number): string[] {
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
