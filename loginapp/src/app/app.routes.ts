import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/login', pathMatch:'full'},   

    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'dashboard', component:DashboardComponent, canActivate:[authGuard]},

    

];
