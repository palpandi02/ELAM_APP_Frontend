import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ManagerLeaveComponentComponent } from './leave/manager-leave-component/manager-leave-component.component';
import { EmployeeLeaveComponentComponent } from './leave/employee-leave-component/employee-leave-component.component';
import { LeaveComponent } from './leave/leave.component';
import { EmployeeShiftComponent } from './shift/employee-shift/employee-shift.component';
import { ShiftComponent } from './shift/shift.component';
import { SwapShiftComponent } from './shift/swap-shift/swap-shift.component';
import { ManagerShiftComponent } from './shift/manager-shift/manager-shift.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent }, // Default landing page
    { path: 'employee', component: EmployeeComponent }, // Employee management page
    { path: 'login', component: LoginComponent }, // Login page
    { path: 'register', component: RegistrationComponent }, // Registration page
    {path:'leave',component:LeaveComponent},
    {path:'eshift',component:EmployeeShiftComponent},
    {path:"swap",component:SwapShiftComponent},
    {path:'mshift',component:ManagerShiftComponent},
    { path: '**', redirectTo: '' } // Fallback route
];