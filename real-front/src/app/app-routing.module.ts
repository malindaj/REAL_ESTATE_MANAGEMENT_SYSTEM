import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './public/home/home.component';
import {UserDashboardComponent} from './users/user-dashboard/user-dashboard.component';
import {AgentListComponent} from "./public/layouts/agent/agent-list/agent-list.component";
import {AgentDetailComponent} from "./public/layouts/agent/agent-detail/agent-detail.component";
import {PropertyListComponent} from "./public/layouts/property/property-list/property-list.component";
import {Step1Component} from "./public/layouts/property/add-property/step1/step1.component";
import {Step2Component} from "./public/layouts/property/add-property/step2/step2.component";
import {Step4Component} from "./public/layouts/property/add-property/step4/step4.component";
import {Step5Component} from "./public/layouts/property/add-property/step5/step5.component";
import {Step3Component} from "./public/layouts/property/add-property/step3/step3.component";
import {SinglePropertyComponent} from "./public/layouts/property/single-property/single-property.component";
import {SearchComponent} from "./public/search/search.component";
import {AboutComponent} from "./public/pages/about/about.component";
import {ContactComponent} from "./public/pages/contact/contact.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user-dashboard', component: UserDashboardComponent},
  {path: 'agents', component: AgentListComponent},
  {path: 'agent-detail/:id' , component: AgentDetailComponent},
  {path: 'property-list', component: PropertyListComponent},
  {path: 'property-detail/:id', component: SinglePropertyComponent},
  {path: 'search/:city/:type/:purpose/:minprice/:maxprice/:bedroom/:bathroom', component: SearchComponent},
  {path: 'step-1', component: Step1Component},
  {path: 'step-2', component: Step2Component},
  {path: 'step-3', component: Step3Component},
  {path: 'step-4', component: Step4Component},
  {path: 'step-5', component: Step5Component},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
