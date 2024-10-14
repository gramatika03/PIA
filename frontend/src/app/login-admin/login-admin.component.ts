import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  constructor(private service: AdminService, private router: Router) { }

  username: String = "";
  password: String = "";
  message: String = "";

  logIn() {
    this.service.logIn(this.username, this.password).subscribe(
      data => {
        if(data) {
          localStorage.setItem("logged", JSON.stringify(data))
          this.router.navigate(['/admin'])
        } else {
          this.message = "Неуспело пријављивање"
        }
      }
    )
  }

}
