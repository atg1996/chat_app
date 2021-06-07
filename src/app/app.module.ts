import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
/*import {TokenInterceptorService} from './_helpers/token-interceptor.service';*/
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import {ChatNamesService} from './chat-names.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ChatroomComponent,
    NavbarComponent,
    RegisterPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    ChatNamesService
    /*{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
