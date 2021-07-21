import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
