import { Component } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { Owner } from '../models/Owner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent {

  constructor(private service: OwnerService, private router: Router) { }

  changePassword() {
    this.router.navigate(['/changePassword'])
  }

  chosen(i: number) {
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
    let user = localStorage.getItem("logged");
    if (user) this.owner = JSON.parse(user);
  }

  owner: Owner = new Owner();
  messageOwner: String = ""

  checkCard() {
    if ((this.owner.creditCardNumber.substring(0, 3) == "300" ||
      this.owner.creditCardNumber.substring(0, 3) == "301" ||
      this.owner.creditCardNumber.substring(0, 3) == "302" ||
      this.owner.creditCardNumber.substring(0, 3) == "303" ||
      this.owner.creditCardNumber.substring(0, 3) == "300" ||
      this.owner.creditCardNumber.substring(0, 2) == "36" ||
      this.owner.creditCardNumber.substring(0, 2) == "38") && this.owner.creditCardNumber.length == 15
    ) {
      return true;
    } else if ((this.owner.creditCardNumber.substring(0, 2) == "51" ||
      this.owner.creditCardNumber.substring(0, 2) == "52" ||
      this.owner.creditCardNumber.substring(0, 2) == "53" ||
      this.owner.creditCardNumber.substring(0, 2) == "54" ||
      this.owner.creditCardNumber.substring(0, 2) == "55") && this.owner.creditCardNumber.length == 16
    ) {
      return true;
    } else if ((this.owner.creditCardNumber.substring(0, 4) == "4539" ||
      this.owner.creditCardNumber.substring(0, 4) == "4556" ||
      this.owner.creditCardNumber.substring(0, 4) == "4916" ||
      this.owner.creditCardNumber.substring(0, 4) == "4532" ||
      this.owner.creditCardNumber.substring(0, 4) == "4929" ||
      this.owner.creditCardNumber.substring(0, 4) == "4485" ||
      this.owner.creditCardNumber.substring(0, 4) == "4716") && this.owner.creditCardNumber.length == 16) {
      return true;
    } else {
      return false;
    }
  }

  checkPassword() {
    let passwordPattern = /^(?=[A-Za-z])(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return passwordPattern.test(this.owner.password.toString());
  }

  saveChanges() {
    if (!this.checkCard()) {
      this.messageOwner = "Неисправан број картице"
    }
    if (!this.checkCard()) {
      this.messageOwner = "Неисправна шифра"
    }

    this.service.saveChanges(this.owner).subscribe(
      data => {
        if (data) {
          this.messageOwner = ""
          localStorage.removeItem("logged");
          localStorage.setItem("logged", JSON.stringify(this.owner));
          this.ngOnInit();
        } else {
          this.messageOwner = "Емаил већ коришћен"
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
              this.owner.picture = reader.result as string;
            }
          };
          img.src = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
    }
  }
}
