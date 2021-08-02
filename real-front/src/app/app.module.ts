import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { HeaderComponent } from './public/header/header.component';
import { FooterComponent } from './public/footer/footer.component';
import { SinglePropertyComponent } from './public/layouts/property/single-property/single-property.component';
import { PropertyListComponent } from './public/layouts/property/property-list/property-list.component';
import { AgentListComponent } from './public/layouts/agent/agent-list/agent-list.component';
import { AgentDetailComponent } from './public/layouts/agent/agent-detail/agent-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { TestComponent } from './test/test.component';
import { Step1Component } from './public/layouts/property/add-property/step1/step1.component';
import { Step2Component } from './public/layouts/property/add-property/step2/step2.component';
import { Step3Component } from './public/layouts/property/add-property/step3/step3.component';
import { Step4Component } from './public/layouts/property/add-property/step4/step4.component';
import { Step5Component } from './public/layouts/property/add-property/step5/step5.component';
import { SearchComponent } from './public/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SinglePropertyComponent,
    PropertyListComponent,
    AgentListComponent,
    AgentDetailComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    TestComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
