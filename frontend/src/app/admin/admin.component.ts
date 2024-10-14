import { Component, OnInit } from '@angular/core';
import { Owner } from '../models/Owner';
import { Decorater } from '../models/Decorater';
import { Firm } from '../models/Firm';
import { OwnerService } from '../services/owner.service';
import { DecoraterService } from '../services/decorater.service';
import { FirmService } from '../services/firm.service';
import { Admin } from '../models/Admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private ownerService: OwnerService, private decoraterService: DecoraterService, private firmService: FirmService) { }

  ngOnInit(): void {
    let adminData = localStorage.getItem("logged");
    if(adminData) {
      this.admin = JSON.parse(adminData);
    }

    if(this.admin == null) {
      return;
    }

    this.owners = [];
    this.decoraters = [];
    this.firms = [];
    this.requests = []
    this.messageOwner = ""
    this.messageDecorater = ""
    this.jobMessage = ""
    this.messageAddingDecorater = ""

    this.ownerService.getAll().subscribe(
      data => {
        this.owners = data
      }
    )

    this.decoraterService.getAll().subscribe(
      data => {
        this.decoraters = data
      }
    )

    this.firmService.getAll().subscribe(
      data => {
        this.firms = data
      }
    )

    this.ownerService.getAllRequests().subscribe(
      data => {
        this.requests = data
      }
    )

    if (this.addDecorater.picture == "") {
      fetch('assets/images/defaultAccount.jpg').then(response => response.blob()).then(blob => {
        const file = new File([blob], 'your-image.jpg', { type: blob.type });

        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              if ((img.width <= 300 && img.height <= 300) && (img.width >= 100 && img.height >= 100)) {
                this.addDecorater.picture = reader.result as string;
              }
            };
            img.src = reader.result as string;
          }
          reader.readAsDataURL(file)
        }
      })
    }
  }

  admin: Admin | null = null;

  owners: Owner[] = [];
  decoraters: Decorater[] = [];
  firms: Firm[] = [];
  addDecorater: Decorater = new Decorater();
  addFirm: Firm = new Firm();
  messageOwner: String = "";
  messageDecorater: String = "";
  cardIcon: Number = 0;
  messageAddingDecorater: String = ""
  requests: Owner[] = []
  firmMessage: String = ""
  jobMessage: String = ""

  usernameJob: String = ""
  firmNameJob: String = ""
  notLoggedIn: string = "Нисте пријављени у систем"

  checkCard(creditCardNumber: String) {
    if ((creditCardNumber.substring(0, 3) == "300" ||
      creditCardNumber.substring(0, 3) == "301" ||
      creditCardNumber.substring(0, 3) == "302" ||
      creditCardNumber.substring(0, 3) == "303" ||
      creditCardNumber.substring(0, 3) == "300" ||
      creditCardNumber.substring(0, 2) == "36" ||
      creditCardNumber.substring(0, 2) == "38") && creditCardNumber.length == 15
    ) {
      return true;
    } else if ((creditCardNumber.substring(0, 2) == "51" ||
      creditCardNumber.substring(0, 2) == "52" ||
      creditCardNumber.substring(0, 2) == "53" ||
      creditCardNumber.substring(0, 2) == "54" ||
      creditCardNumber.substring(0, 2) == "55") && creditCardNumber.length == 16
    ) {
      return true;
    } else if ((creditCardNumber.substring(0, 4) == "4539" ||
      creditCardNumber.substring(0, 4) == "4556" ||
      creditCardNumber.substring(0, 4) == "4916" ||
      creditCardNumber.substring(0, 4) == "4532" ||
      creditCardNumber.substring(0, 4) == "4929" ||
      creditCardNumber.substring(0, 4) == "4485" ||
      creditCardNumber.substring(0, 4) == "4716") && creditCardNumber.length == 16) {
      return true;
    } else {
      return false;
    }
  }

  checkPassword(password: String) {
    let passwordPattern = /^(?=[A-Za-z])(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return passwordPattern.test(password.toString());
  }

  deactivateOwner(owner: Owner) {
    this.ownerService.deactivate(owner).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  saveChangesOwner(owner: Owner) {
    if (!this.checkPassword(owner.password) || !this.checkCard(owner.creditCardNumber)) {
      this.messageOwner = "Неисправни подаци"
      return;
    }
    this.ownerService.saveChanges(owner).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

  addedPhotoOwner(event: any, i: Number) {
    if (event.target.value) {
      const file = <File>event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            if ((img.width <= 300 && img.height <= 300) && (img.width >= 100 && img.height >= 100)) {
              this.owners[i.valueOf()].picture = reader.result as string;
            }
          };
          img.src = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
    }
  }

  deactivateDecorater(decorater: Decorater) {
    this.decoraterService.deactivate(decorater).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  saveChangesDecorater(decorater: Decorater) {
    if (!this.checkPassword(decorater.password) || !this.checkCard(decorater.creditCardNumber)) {
      this.messageDecorater = "Неисправни подаци"
      return;
    }
    this.decoraterService.saveChanges(decorater).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

  addedPhotoDecorater(event: any, i: Number) {
    if (event.target.value) {
      const file = <File>event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            if ((img.width <= 300 && img.height <= 300) && (img.width >= 100 && img.height >= 100)) {
              this.decoraters[i.valueOf()].picture = reader.result as string;
            }
          };
          img.src = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
    }
  }

  addNewDecorater() {
    this.addDecorater.activated = true;
    this.addDecorater.type = 2;
    this.addDecorater.busyUntil = new Date(1, 0, 1)
    this.addDecorater.busyFrom = new Date(1, 0, 1);
    this.addDecorater.firm = ""
    this.decoraterService.addNew(this.addDecorater).subscribe(
      data => {
        if (data) {
          this.messageAddingDecorater = "Успешно"
          this.addDecorater = new Decorater();
          this.ngOnInit();
        }
        else this.messageAddingDecorater = "неуспешно"
      }
    )
  }

  checkCardNew() {
    if ((this.addDecorater.creditCardNumber.substring(0, 3) == "300" ||
      this.addDecorater.creditCardNumber.substring(0, 3) == "301" ||
      this.addDecorater.creditCardNumber.substring(0, 3) == "302" ||
      this.addDecorater.creditCardNumber.substring(0, 3) == "303" ||
      this.addDecorater.creditCardNumber.substring(0, 3) == "300" ||
      this.addDecorater.creditCardNumber.substring(0, 2) == "36" ||
      this.addDecorater.creditCardNumber.substring(0, 2) == "38") && this.addDecorater.creditCardNumber.length == 15
    ) {
      this.cardIcon = 1;
      return true;
    } else if ((this.addDecorater.creditCardNumber.substring(0, 2) == "51" ||
      this.addDecorater.creditCardNumber.substring(0, 2) == "52" ||
      this.addDecorater.creditCardNumber.substring(0, 2) == "53" ||
      this.addDecorater.creditCardNumber.substring(0, 2) == "54" ||
      this.addDecorater.creditCardNumber.substring(0, 2) == "55") && this.addDecorater.creditCardNumber.length == 16
    ) {
      this.cardIcon = 2;
      return true;
    } else if ((this.addDecorater.creditCardNumber.substring(0, 4) == "4539" ||
      this.addDecorater.creditCardNumber.substring(0, 4) == "4556" ||
      this.addDecorater.creditCardNumber.substring(0, 4) == "4916" ||
      this.addDecorater.creditCardNumber.substring(0, 4) == "4532" ||
      this.addDecorater.creditCardNumber.substring(0, 4) == "4929" ||
      this.addDecorater.creditCardNumber.substring(0, 4) == "4485" ||
      this.addDecorater.creditCardNumber.substring(0, 4) == "4716") && this.addDecorater.creditCardNumber.length == 16) {
      this.cardIcon = 3;
      return true;
    } else {
      this.cardIcon = 0
      return false;
    }
  }

  addedPhotoNewDec(event: any) {
    if (event.target.value) {
      const file = <File>event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            if ((img.width <= 300 && img.height <= 300) && (img.width >= 100 && img.height >= 100)) {
              this.addDecorater.picture = reader.result as string;
            }
          };
          img.src = reader.result as string;
        }
        reader.readAsDataURL(file)
      }
    }
  }

  acceptRequest(request: Owner) {
    this.ownerService.acceptRequest(request).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

  denyRequest(request: Owner) {
    this.ownerService.denyRequest(request).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }

  addNewFirm() {
    for (let i = 0; i < this.firms.length; i++) {
      if (this.firms[i].name == this.addFirm.name) {
        this.firmMessage = "Фирма већ постоји"
        return;
      }
    }

    this.firmService.add(this.addFirm).subscribe(
      data => {
        this.firmMessage = "Успешно додата фирма"
        this.ngOnInit()
      }
    )
  }

  addJob() {
    for (let i = 0; i < this.decoraters.length; i++) {
      if (this.decoraters[i].username == this.usernameJob) {
        this.decoraterService.addJob(this.usernameJob, this.firmNameJob).subscribe(
          data => {
            if (data) this.jobMessage = "Декоратер додат у фирму"
            else this.jobMessage = "Декоратер већ запошљен"
          }
        );
        break;
      }
    }
  }

  newService: String = ""
  services: String[] = []
  newPrice: number = 0;
  prices: number[] = []

  addServicePrice() {
    if(this.addFirm.services == "") {
      this.addFirm.services = this.newService
      this.addFirm.prices = String(this.newPrice)
    } else {
      this.addFirm.services = this.addFirm.services + "," + this.newService
      this.addFirm.prices = this.addFirm.prices + "," + String(this.newPrice)
    }
    this.services.push(this.newService)
    this.prices.push(this.newPrice)
  }

  allowAppointments(decorater: Decorater) {
    this.decoraterService.allowAppointments(decorater).subscribe(
      data => {
        this.ngOnInit();
      }
    )
  }
}
