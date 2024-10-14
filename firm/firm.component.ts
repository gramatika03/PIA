import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Firm } from '../models/Firm';
import { FinishedJobs } from '../models/FinishedJobs';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/Appointment';
import { Owner } from '../models/Owner';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Decorater } from '../models/Decorater';
import { DecoraterService } from '../services/decorater.service';

interface CanvasElement {
  x: number;
  y: number;
  radius?: number;
  width?: number;
  height?: number;
  type: 'green' | 'pool' | 'fountain' | 'table' | 'chairs';
}

@Component({
  selector: 'app-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.css']
})
export class FirmComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private router: Router, private sanitizer: DomSanitizer, private decoraterService: DecoraterService) { }

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

  firm: Firm = new Firm()
  finishedJobs: FinishedJobs[] = []
  owner: Owner = new Owner()
  comments: String[] = []
  services: String[] = []
  chosenService: boolean[] = []
  prices: String[] = []
  message: String = ""
  file: File | null = null

  ngOnInit(): void {
    let data = localStorage.getItem("firm")
    if (data) {
      this.firm = JSON.parse(data);
      this.services = this.firm.services.split(",")
      this.prices = this.firm.prices.split(",")
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.firm.location.toString());
      for (let i = 0; i < this.services.length; i++) {
        this.chosenService[i] = false;
      }
      this.firm.startPause = new Date(this.firm.startPause)
      this.firm.endPause = new Date(this.firm.endPause)
      this.appointmentService.getFinishedJobsDataByFirm(this.firm.name).subscribe(
        data => {
          this.finishedJobs = data;
          for (let i = 0; i < this.finishedJobs.length; i++) {
            this.comments[i] = this.finishedJobs[i].comment
          }
        }
      )
      this.decoraterService.getAll().subscribe(
        data => {
          let allDecoraters = data
          for (let i = 0; i < allDecoraters.length; i++) {
            if (allDecoraters[i].firm == this.firm.name) {
              this.busyUntil.push(new Date(allDecoraters[i].busyUntil))
              this.busyFrom.push(new Date(allDecoraters[i].busyFrom))
            }
          }
        }
      )
    }
    let dataUser = localStorage.getItem("logged")
    if (dataUser) {
      this.owner = JSON.parse(dataUser)
    }
  }

  startDate: Date = new Date();
  squareFootage: Number = 0;
  privatePublicGarden: Number = 0;
  poolFootage: Number = 0;
  greenFootage: Number = 0;
  sittingFootage: Number = 0;
  fountainFootage: Number = 0;
  sittingNumber: Number = 0;
  description: String = "";
  safeUrl: SafeResourceUrl | null = null;
  workers: Decorater[] = []
  busyFrom: Date[] = []
  busyUntil: Date[] = []

  makeAppointment() {
    if (this.privatePublicGarden == 1) {
      if (this.squareFootage.valueOf() != this.poolFootage.valueOf() + this.greenFootage.valueOf() + this.sittingFootage.valueOf()) {
        this.message = "Збир површине под базеном, зелене површине и површине за седење је различит од укупне површине"
        return;
      }
    } else if (this.privatePublicGarden == 2) {
      if (this.squareFootage.valueOf() < this.fountainFootage.valueOf() + this.greenFootage.valueOf()) {
        this.message = "Збир површине под фонтаном и зеленом површином је већи од укупне површине"
        return;
      }
    } else {
      this.message = "Тип баште није изабран"
      return;
    }
    this.startDate = new Date(this.startDate)

    if (this.firm.startPause <= this.startDate && this.startDate <= this.firm.endPause) {
      this.message = "Фирма је тада на одмору";
      return;
    }

    let numberFree = 0;
    for (let i = 0; i < this.busyFrom.length; i++) {
      if (!(this.busyFrom[i] <= this.startDate && this.startDate <= this.busyUntil[i])) {
        numberFree = numberFree + 1
      }
    }

    if (numberFree == 0) {
      this.message = "Тада нема слободних декоратера";
      return;
    }

    if (this.privatePublicGarden == 2) {
      this.sittingFootage = this.squareFootage.valueOf() - this.greenFootage.valueOf() - this.fountainFootage.valueOf()
    }
    let appointment = new Appointment();
    appointment.owner = this.owner.username
    appointment.firm = this.firm.name;
    appointment.startDate = this.startDate;
    appointment.squareFootage = this.squareFootage;
    appointment.privatePublicGarden = this.privatePublicGarden;
    appointment.poolFootage = this.poolFootage;
    appointment.greenFootage = this.greenFootage;
    appointment.sittingFootage = this.sittingFootage;
    appointment.fountainFootage = this.fountainFootage;
    appointment.sittingNumber = this.sittingNumber;
    appointment.description = this.description;
    appointment.fountainNumber = 0
    appointment.poolNumber = 0
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].type == 'pool') {
        appointment.poolNumber = appointment.poolNumber + 1
      } else if (this.elements[i].type == 'fountain') {
        appointment.fountainNumber = appointment.fountainNumber + 1;
      }
    }
    let services: String = ""
    for (let i = 0; i < this.chosenService.length; i++) {
      if (this.chosenService[i])
        if (services == "") {
          services = this.services[i]
        } else {
          services = services + "," + this.services[i]
        }
    }
    appointment.look = this.elements;
    appointment.services = services
    appointment.accepted = false;
    appointment.owner = this.owner.username
    this.appointmentService.addAppointment(appointment).subscribe(
      data => {
        if (data) {
          this.message = "Додато"
          this.clearData();
          this.ngOnInit()
        } else {
          this.message = "Неуспело додавање"
        }
      }
    )
  }

  chosen(i: number) {
    this.chosenService[i] = !this.chosenService[i]
  }

  clearData() {
    this.startDate = new Date();
    this.squareFootage = 0;
    this.privatePublicGarden = 0;
    this.poolFootage = 0;
    this.greenFootage = 0;
    this.sittingFootage = 0;
    this.fountainFootage = 0;
    this.sittingNumber = 0;
    this.description = "";
    for (let i = 0; i < this.chosenService.length; i++) {
      this.chosenService[i] = false
    }
    this.elements = []
  }


  hoverElement: CanvasElement | null = null;
  elements: CanvasElement[] = [];
  chosenElement: string = ""
  fajl: File | null = null;

  greenHeight: number = 40;
  greenWidth: number = 40;

  poolHeight: number = 125;
  poolWidth: number = 450;

  fountainRadius: number = 60;

  tableRadius: number = 20;

  chairsHeight: number = 80;
  chairsWidth: number = 40;

  @ViewChild('gardenCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.drawGarden();
  }

  drawGarden(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.elements.forEach(element => {
        if (element.type == 'green') {
          this.drawRectangle(ctx, element.x, element.y, this.greenWidth, this.greenHeight, 'rgba(181,230,29,255)', 'rgba(67,189,62,255)');
        } else if (element.type == 'pool' && element.width && element.height) {
          this.drawRectangle(ctx, element.x, element.y, this.poolWidth, this.poolHeight, 'rgba(0,162,232,255)', 'rgba(34,111,215,255)');
        } else if (element.type == 'fountain' && element.radius) {
          this.drawCircle(ctx, element.x, element.y, this.fountainRadius, 'rgba(150,219,255,1)', 'rgba(86,192,246,1)');
        } else if (element.type == 'table' && element.radius) {
          this.drawCircle(ctx, element.x, element.y, this.tableRadius, 'rgba(185,122,87,255)', 'rgba(185,122,87,255)');
        } else if (element.type == 'chairs' && element.width && element.height) {
          this.drawRectangle(ctx, element.x, element.y, this.chairsWidth, this.chairsHeight, 'rgba(195,195,195,255)', 'rgba(138,138,138,255)');
        }
      });

      if (this.hoverElement) {
        if (this.hoverElement.type == 'green' && this.hoverElement.width && this.hoverElement.height) {
          this.drawRectangle(ctx, this.hoverElement.x, this.hoverElement.y, this.greenWidth, this.greenHeight, 'rgba(181,230,29,255)', 'rgba(67,189,62,255)');
        } else if (this.hoverElement.type == 'pool' && this.hoverElement.width && this.hoverElement.height) {
          this.drawRectangle(ctx, this.hoverElement.x, this.hoverElement.y, this.poolWidth, this.poolHeight, 'rgba(0,162,232,255)', 'rgba(34,111,215,255)');
        } else if (this.hoverElement.type == 'fountain' && this.hoverElement.radius) {
          this.drawCircle(ctx, this.hoverElement.x, this.hoverElement.y, this.fountainRadius, 'rgba(150,219,255,1)', 'rgba(86,192,246,1)');
        } else if (this.hoverElement.type == 'table' && this.hoverElement.radius) {
          this.drawCircle(ctx, this.hoverElement.x, this.hoverElement.y, this.tableRadius, 'rgba(185,122,87,255)', 'rgba(185,122,87,255)');
        } else if (this.hoverElement.type == 'chairs' && this.hoverElement.width && this.hoverElement.height) {
          this.drawRectangle(ctx, this.hoverElement.x, this.hoverElement.y, this.chairsWidth, this.chairsHeight, 'rgba(195,195,195,255)', 'rgba(138,138,138,255)');
        }
      }
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      return;
    }

    if (this.chosenElement == 'green') {
      this.hoverElement = { x: x, y: y, height: this.greenHeight, width: this.greenWidth, type: 'green' }
    } else if (this.chosenElement == 'pool') {
      this.hoverElement = { x: x, y: y, height: this.poolHeight, width: this.poolWidth, type: 'pool' }
    } else if (this.chosenElement == 'fountain') {
      this.hoverElement = { x: x, y: y, radius: this.fountainRadius, type: 'fountain' }
    } else if (this.chosenElement == 'table') {
      this.hoverElement = { x: x, y: y, radius: this.tableRadius, type: 'table' }
    } else if (this.chosenElement == 'chairs') {
      this.hoverElement = { x: x, y: y, height: this.chairsHeight, width: this.chairsWidth, type: 'chairs' }
    }

    this.drawGarden();
  }

  @HostListener('click', ['$event'])
  onCanvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      return;
    }

    if (this.chosenElement == 'green') {
      if (!this.isOverlapingRectangle(x, y, this.greenWidth, this.greenHeight)) {
        this.elements.push({ x: x, y: y, width: this.greenWidth, height: this.greenHeight, type: 'green' })
      }
    } else if (this.chosenElement == 'pool') {
      if (!this.isOverlapingRectangle(x, y, this.poolWidth, this.poolHeight)) {
        this.elements.push({ x: x, y: y, width: this.poolWidth, height: this.poolHeight, type: 'pool' })
      }
    } else if (this.chosenElement == 'fountain') {
      if (!this.isOverlappingCircle(x, y, this.fountainRadius)) {
        this.elements.push({ x: x, y: y, radius: this.fountainRadius, type: 'fountain' })
      }
    } else if (this.chosenElement == 'table') {
      if (!this.isOverlappingCircle(x, y, this.tableRadius)) {
        this.elements.push({ x: x, y: y, radius: this.tableRadius, type: 'table' })
      }
    } else if (this.chosenElement == 'chairs') {
      if (!this.isOverlapingRectangle(x, y, this.greenWidth, this.greenHeight)) {
        this.elements.push({ x: x, y: y, width: this.chairsWidth, height: this.chairsHeight, type: 'chairs' })
      }
    } else if (this.chosenElement == "clear") {
      for (let i = this.elements.length - 1; i >= 0; i--) {
        const element = this.elements[i];
        if ((element.type === 'fountain' || element.type === 'table') && element.radius) {
          const dx = x - element.x;
          const dy = y - element.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < element.radius) {
            this.elements.splice(i, 1);
          }
        } else if ((element.type === 'green' || element.type === 'pool' || element.type === 'chairs') && element.width && element.height) {
          let upperLeftX = element.x;
          let upperLeftY = element.y;
          let lowerLeftX = element.x;
          let lowerLeftY = element.y + element.height;
          let upperRightX = element.x + element.width;
          let upperRightY = element.y;
          let lowerRightX = element.x + element.width;
          let lowerRightY = element.y + element.height;

          if (x > upperLeftX && x < upperRightX && y > upperLeftY && y < lowerLeftY) {
            this.elements.splice(i, 1);
          }
        }
      }
    }
    this.hoverElement = null;
    this.drawGarden();
  }

  drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fillColor: string, borderColor: string): void {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = borderColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  isOverlappingCircle(x: number, y: number, radius: number): boolean {
    for (const element of this.elements) {
      if ((element.type === 'fountain' || element.type == 'table') && element.radius) {
        const dx = x - element.x;
        const dy = y - element.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < element.radius + radius) {
          return true;
        }
      } else if ((element.type === 'green' || element.type === 'pool' || element.type === 'chairs') && element.width && element.height) {
        let upperLeftX = element.x;
        let upperLeftY = element.y;
        let lowerLeftX = element.x;
        let lowerLeftY = element.y + element.height;
        let upperRightX = element.x + element.width;
        let upperRightY = element.y;
        let lowerRightX = element.x + element.width;
        let lowerRightY = element.y + element.height;

        let dxUpperLeft = upperLeftX - x;
        let dxUpperRight = upperRightX - x;
        let dyUpperLeft = upperLeftY - y;
        let dyUpperRight = upperRightY - y;

        let dxLowerLeft = lowerLeftX - x;
        let dxLowerRight = lowerRightX - x;
        let dyLowerLeft = lowerLeftY - y;
        let dyLowerRight = lowerRightY - y;

        let distanceUpperLeft = Math.sqrt(dxUpperLeft * dxUpperLeft + dyUpperLeft * dyUpperLeft)
        let distanceUpperRight = Math.sqrt(dxUpperRight * dxUpperRight + dyUpperRight * dyUpperRight)
        let distanceLowerLeft = Math.sqrt(dxLowerLeft * dxLowerLeft + dyLowerLeft * dyLowerLeft)
        let distanceLowerRight = Math.sqrt(dxLowerRight * dxLowerRight + dyLowerRight * dyLowerRight)

        let upX = x;
        let upY = y - radius;
        let downX = x;
        let downY = y + radius;
        let leftX = x - radius
        let leftY = y;
        let rightX = x + radius;
        let rightY = y;

        if (distanceLowerLeft < radius || distanceLowerRight < radius || distanceUpperLeft < radius || distanceUpperRight < radius) {
          return true;
        }
        if (x > upperLeftX && x < upperRightX && y > upperLeftY && y < lowerLeftY) {
          return true;
        }
        if(upX > upperLeftX && upX < upperRightX && upY > upperLeftY && upY < lowerLeftY) {
          return true;
        }
        if(downX > upperLeftX && downX < upperRightX && downY > upperLeftY && downY < lowerLeftY) {
          return true;
        }
        if(leftX > upperLeftX && leftX < upperRightX && leftY > upperLeftY && leftY < lowerLeftY) {
          return true;
        }
        if(rightX > upperLeftX && rightX < upperRightX && rightY > upperLeftY && rightY < lowerLeftY) {
          return true;
        }
      }
    }
    return false;
  }

  drawRectangle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string,
    borderColor: string,
    lineWidth: number = 1
  ): void {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = lineWidth;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
  }

  isOverlapingRectangle(x: number, y: number, width: number, height: number): boolean {
    for (const element of this.elements) {
      if ((element.type === 'fountain' || element.type == 'table') && element.radius) {
        let upperLeftX = x;
        let upperLeftY = y;
        let lowerLeftX = x;
        let lowerLeftY = y + height;
        let upperRightX = x + width;
        let upperRightY = y;
        let lowerRightX = x + width;
        let lowerRightY = y + height;

        let dxUpperLeft = upperLeftX - element.x;
        let dxUpperRight = upperRightX - element.x;
        let dyUpperLeft = upperLeftY - element.y;
        let dyUpperRight = upperRightY - element.y;

        let dxLowerLeft = lowerLeftX - element.x;
        let dxLowerRight = lowerRightX - element.x;
        let dyLowerLeft = lowerLeftY - element.y;
        let dyLowerRight = lowerRightY - element.y;

        let distanceUpperLeft = Math.sqrt(dxUpperLeft * dxUpperLeft + dyUpperLeft * dyUpperLeft)
        let distanceUpperRight = Math.sqrt(dxUpperRight * dxUpperRight + dyUpperRight * dyUpperRight)
        let distanceLowerLeft = Math.sqrt(dxLowerLeft * dxLowerLeft + dyLowerLeft * dyLowerLeft)
        let distanceLowerRight = Math.sqrt(dxLowerRight * dxLowerRight + dyLowerRight * dyLowerRight)

        let upX = element.x;
        let upY = element.y - element.radius;
        let downX = element.x;
        let downY = element.y + element.radius;
        let leftX = element.x - element.radius
        let leftY = element.y;
        let rightX = element.x + element.radius;
        let rightY = element.y;

        if (distanceLowerLeft < element.radius || distanceLowerRight < element.radius || distanceUpperLeft < element.radius || distanceUpperRight < element.radius) {
          return true;
        }
        if (element.x > upperLeftX && element.x < upperRightX && element.y > upperLeftY && element.y < lowerLeftY) {
          return true;
        }
        if (upX > upperLeftX && upX < upperRightX && upY > upperLeftY && upY < lowerLeftY) {
          return true;
        }
        if (downX > upperLeftX && downX < upperRightX && downY > upperLeftY && downY < lowerLeftY) {
          return true;
        }
        if (leftX > upperLeftX && leftX < upperRightX && leftY > upperLeftY && leftY < lowerLeftY) {
          return true;
        }
        if (rightX > upperLeftX && rightX < upperRightX && rightY > upperLeftY && rightY < lowerLeftY) {
          return true;
        }
      } else if ((element.type === 'green' || element.type === 'pool' || element.type === 'chairs') && element.width && element.height) {
        if (
          x < element.x + element.width &&
          x + width > element.x &&
          y < element.y + element.height &&
          y + height > element.y
        ) {
          return true;
        }
      }
    }
    return false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fajl = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;

        try {
          const parsedData: CanvasElement[] = JSON.parse(fileContent);

          if (Array.isArray(parsedData)) {
            this.elements = parsedData.filter(item => this.isValidCanvasElement(item));
          } else {
            console.error('Invalid file format');
          }
        } catch (error) {
          console.error('Error parsing file', error);
        }
      };

      reader.readAsText(this.fajl);
    }

  }

  isValidCanvasElement(element: any): element is CanvasElement {
    return typeof element.x === 'number' &&
      typeof element.y === 'number' &&
      (element.radius === undefined || typeof element.radius === 'number') &&
      (element.width === undefined || typeof element.width === 'number') &&
      (element.height === undefined || typeof element.height === 'number') &&
      ['green', 'pool', 'fountain', 'table', 'chairs'].includes(element.type);
  }
}
