import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {LoginGuard} from './_guards/login.guard';
/*import {AuthGuard} from './_guards/auth-guard.service';*/

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'chatroom', component: ChatroomComponent, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterPageComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

