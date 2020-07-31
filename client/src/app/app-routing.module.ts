import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingGuardGuard } from './services/routing-guard.guard';

import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'login', redirectTo: '', pathMatch: 'full' },
{ path: 'home', component: HomeComponent, canActivate: [RoutingGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
