import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Decorater } from '../models/Decorater';
import { DecoraterService } from '../services/decorater.service';

@Component({
  selector: 'app-decorater',
  templateUrl: './decorater.component.html',
  styleUrls: ['./decorater.component.css']
})
export class DecoraterComponent implements OnInit {

  constructor(private service: DecoraterService, private router: Router) { }

  ngOnInit(): void {
    let user = localStorage.getItem("logged");
    if (user) this.decorater = JSON.parse(user);
  }

  decorater: Decorater = new Decorater();
  messageDecorater: String = ""

  changePassword() {
    this.router.navigate(['/changePassword'])
  }

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

  checkCard() {
    if ((this.decorater.creditCardNumber.substring(0, 3) == "300" ||
      this.decorater.creditCardNumber.substring(0, 3) == "301" ||
      this.decorater.creditCardNumber.substring(0, 3) == "302" ||
      this.decorater.creditCardNumber.substring(0, 3) == "303" ||
      this.decorater.creditCardNumber.substring(0, 3) == "300" ||
      this.decorater.creditCardNumber.substring(0, 2) == "36" ||
      this.decorater.creditCardNumber.substring(0, 2) == "38") && this.decorater.creditCardNumber.length == 15
    ) {
      return true;
    } else if ((this.decorater.creditCardNumber.substring(0, 2) == "51" ||
      this.decorater.creditCardNumber.substring(0, 2) == "52" ||
      this.decorater.creditCardNumber.substring(0, 2) == "53" ||
      this.decorater.creditCardNumber.substring(0, 2) == "54" ||
      this.decorater.creditCardNumber.substring(0, 2) == "55") && this.decorater.creditCardNumber.length == 16
    ) {
      return true;
    } else if ((this.decorater.creditCardNumber.substring(0, 4) == "4539" ||
      this.decorater.creditCardNumber.substring(0, 4) == "4556" ||
      this.decorater.creditCardNumber.substring(0, 4) == "4916" ||
      this.decorater.creditCardNumber.substring(0, 4) == "4532" ||
      this.decorater.creditCardNumber.substring(0, 4) == "4929" ||
      this.decorater.creditCardNumber.substring(0, 4) == "4485" ||
      this.decorater.creditCardNumber.substring(0, 4) == "4716") && this.decorater.creditCardNumber.length == 16) {
      return true;
    } else {
      return false;
    }
  }

  checkPassword() {
    let passwordPattern = /^(?=[A-Za-z])(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return passwordPattern.test(this.decorater.password.toString());
  }

  saveChanges() {
    if (!this.checkCard()) {
      this.messageDecorater = "Неисправан број картице"
    }
    if (!this.checkCard()) {
      this.messageDecorater = "Неисправна шифра"
    }

    this.service.saveChanges(this.decorater).subscribe(
      data => {
        if(data) {
          this.messageDecorater = ""
          localStorage.removeItem("logged");
          localStorage.setItem("logged", JSON.stringify(this.decorater));
          this.ngOnInit();
        } else {
          this.messageDecorater = "Емаил већ коришћен"
        }
      }
    )
  }

  addedPhoto(event: any) {
    if (event.target.value) {
      const file = <File>event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            if ((img.width <= 300 && img.height <= 300) && (img.width >= 100 && img.height >= 100)) {
              this.decorater.picture = reader.result as string;
            }
          };
          img.src = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
    }
  }

}
