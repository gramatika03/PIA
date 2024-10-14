import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DecoraterComponent } from './decorater/decorater.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AppointemntDecoraterComponent } from './appointemnt-decorater/appointemnt-decorater.component';
import { MaintenenceDecoraterComponent } from './maintenence-decorater/maintenence-decorater.component';
import { StatisticDecoraterComponent } from './statistic-decorater/statistic-decorater.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { StartPageComponent } from './start-page/start-page.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnerFirmsComponent } from './owner-firms/owner-firms.component';
import { FirmComponent } from './firm/firm.component';
import { OwnerAppointmentComponent } from './owner-appointment/owner-appointment.component';
import { OwnerMaintenenceComponent } from './owner-maintenence/owner-maintenence.component';
import { FooterComponent } from './footer/footer.component';
import { StartComponent } from './start/start.component'

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DecoraterComponent,
    LoginUserComponent,
    AppointemntDecoraterComponent,
    MaintenenceDecoraterComponent,
    StatisticDecoraterComponent,
    RegisterComponent,
    ChangePasswordComponent,
    LogOutComponent,
    LoginAdminComponent,
    StartPageComponent,
    OwnerComponent,
    OwnerFirmsComponent,
    FirmComponent,
    OwnerAppointmentComponent,
    OwnerMaintenenceComponent,
    FooterComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
