import { Component } from '@angular/core';
import { OwnerService } from '../services/owner.service';
declare const grecaptcha: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private service: OwnerService) { }

  ngOnInit(): void {
    fetch('assets/images/defaultAccount.jpg').then(response => response.blob()).then(blob => {
      const file = new File([blob], 'your-image.jpg', { type: blob.type });

      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            if ((img.width <= 300 && img.height <= 300) && (img.width >= 100 && img.height >= 100)) {
              this.imageSizeCorrect = true;
              this.image = reader.result as string;
            } else {
              this.imageSizeCorrect = false;
            }
          };
          img.src = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
    })
  }

  username: String = "";
  password: String = "";
  firstname: String = "";
  lastname: String = "";
  gender: Number = 0;
  address: String = "";
  number: String = "";
  email: String = "";
  file: File | null = null;
  image: String = "";
  creditCardNumber: String = "";
  message: String = "";
  messageCreated: String = "";
  cardIcon: Number = 0;
  formData: FormData = new FormData();
  imageSizeCorrect: boolean = true;

  checkCard() {
    this.cardIcon = 0;
    if ((this.creditCardNumber.substring(0, 3) == "300" ||
      this.creditCardNumber.substring(0, 3) == "301" ||
      this.creditCardNumber.substring(0, 3) == "302" ||
      this.creditCardNumber.substring(0, 3) == "303" ||
      this.creditCardNumber.substring(0, 3) == "300" ||
      this.creditCardNumber.substring(0, 2) == "36" ||
      this.creditCardNumber.substring(0, 2) == "38") && this.creditCardNumber.length == 15
    ) {
      this.cardIcon = 1;
      this.message = "";
    } else if ((this.creditCardNumber.substring(0, 2) == "51" ||
      this.creditCardNumber.substring(0, 2) == "52" ||
      this.creditCardNumber.substring(0, 2) == "53" ||
      this.creditCardNumber.substring(0, 2) == "54" ||
      this.creditCardNumber.substring(0, 2) == "55") && this.creditCardNumber.length == 16
    ) {
      this.cardIcon = 2;
      this.message = "";
    } else if ((this.creditCardNumber.substring(0, 4) == "4539" ||
      this.creditCardNumber.substring(0, 4) == "4556" ||
      this.creditCardNumber.substring(0, 4) == "4916" ||
      this.creditCardNumber.substring(0, 4) == "4532" ||
      this.creditCardNumber.substring(0, 4) == "4929" ||
      this.creditCardNumber.substring(0, 4) == "4485" ||
      this.creditCardNumber.substring(0, 4) == "4716") && this.creditCardNumber.length == 16) {
      this.cardIcon = 3;
      this.message = "";
    } else {
      this.message = "Број кредитне картице није исправан";
    }
  }

  passwordPattern = /^(?=[A-Za-z])(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

  register() {
    this.message = "";
    if (!this.passwordPattern.test(this.password.toString())) {
      this.message = "Неипсравна лозинка";
      return;
    }
    if (this.cardIcon != 1 && this.cardIcon != 2 && this.cardIcon != 3) {
      this.message = "Број кредитне картице није исправан";
      return;
    }

    if (this.selectedFile) {
      this.formData.append('image', this.selectedFile, this.selectedFile.name);

    } else {
      console.error('No file selected!');
    }

    if (!this.imageSizeCorrect) {
      this.message = "Слика недозвољених димензија";
      return;
    }

    this.service.register(this.username, this.password, this.firstname, this.lastname, this.gender, this.address, this.number, this.email, this.image, this.creditCardNumber, 1).subscribe(
      data => {
        if (data) {
          this.messageCreated = "Захтев за креирање налога послат";
          this.message = ""
        } else {
          this.message = "Имејл или корисничко име је већ искоришћено";
        }
      }
    );
  }

  selectedFile: File | null = null;


  addedPhoto(event: any) {
    if (event.target.value) {
      const file = <File>event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            if ((img.width <= 300 && img.height <= 300) && (img.width >= 100 && img.height >= 100)) {
              this.imageSizeCorrect = true;
              this.image = reader.result as string;
            } else {
              this.imageSizeCorrect = false;
            }
          };
          img.src = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
    }
  }


}
