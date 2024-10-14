import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { DecoraterService } from '../services/decorater.service';
import { AdminService } from '../services/admin.service';
import { Decorater } from '../models/Decorater';
import { Owner } from '../models/Owner';
import { Admin } from '../models/Admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit { 

  constructor(private serviceOwner: OwnerService, private decoraterService: DecoraterService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    let user = localStorage.getItem("logged");
    if(user) {
      let userObj = JSON.parse(user)
      this.username = userObj.username
    }

    if(this.username == "") {
      this.router.navigate(['/'])
    }
  }

  passwordOld: String = "";
  passwordNew1: String = "";
  passwordNew2: String = "";
  username: String = ""

  message: String = "";

  passwordPattern = /^(?=[A-Za-z])(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

  change() {
    if (this.passwordNew1 != this.passwordNew2) {
      this.message = "Лозинке се не поклапају";
      return;
    }
    if (!this.passwordPattern.test(this.passwordNew1.toString())) {
      this.message = "Неипсравна лозинка";
      return;
    }

    this.serviceOwner.changePassword(this.username ,this.passwordOld, this.passwordNew1).subscribe(
      data => {
        if(data) {
          this.message = "Шифра промењена"
          localStorage.clear()
          this.router.navigate(['/'])
        }
      }
    );

    this.decoraterService.changePassword(this.username ,this.passwordOld, this.passwordNew1).subscribe(
      data => {
        if(data) {
          this.message = "Шифра промењена"
          localStorage.clear()
          this.router.navigate(['/'])
        }
      }
    );

    this.adminService.changePassword(this.username ,this.passwordOld, this.passwordNew1).subscribe(
      data => {
        if(data) {
          this.message = "Шифра промењена"
          localStorage.clear()
          this.router.navigate(['/'])
        }
      }
    );

    
  }

}
