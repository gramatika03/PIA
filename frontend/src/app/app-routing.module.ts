import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DecoraterComponent } from './decorater/decorater.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AppointemntDecoraterComponent } from './appointemnt-decorater/appointemnt-decorater.component';
import { MaintenenceDecoraterComponent } from './maintenence-decorater/maintenence-decorater.component';
import { StatisticDecoraterComponent } from './statistic-decorater/statistic-decorater.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LogOutComponent } from './log-out/log-out.component';
import { StartPageComponent } from './start-page/start-page.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnerFirmsComponent } from './owner-firms/owner-firms.component';
import { FirmComponent } from './firm/firm.component';
import { OwnerAppointmentComponent } from './owner-appointment/owner-appointment.component';
import { OwnerMaintenenceComponent } from './owner-maintenence/owner-maintenence.component';

const routes: Routes = [
  {path: "admin", component: AdminComponent},
  {path: "decorater", component: DecoraterComponent},
  {path: "loginUser", component: LoginUserComponent},
  {path: "decoraterAppointment", component: AppointemntDecoraterComponent},
  {path: "maintenence", component: MaintenenceDecoraterComponent},
  {path: "statisticDecorater", component: StatisticDecoraterComponent},
  {path: "register", component: RegisterComponent},
  {path: "changePassword", component: ChangePasswordComponent},
  {path: "loginAdmin", component: LoginAdminComponent},
  {path: "logOut", component: LogOutComponent},
  {path: "", component: StartPageComponent},
  {path: "owner", component: OwnerComponent},
  {path: "ownerFirms", component: OwnerFirmsComponent},
  {path: "firm", component: FirmComponent},
  {path: "ownerAppointment", component: OwnerAppointmentComponent},
  {path: "ownerMaintenence", component: OwnerMaintenenceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
