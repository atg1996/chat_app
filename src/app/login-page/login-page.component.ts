import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RequestsService } from '../requests.service';
import { ChatNamesService } from '../chat-names.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  users: string;

  loginInfo = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    }
  );

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private requests: RequestsService,
              private chatNames: ChatNamesService) {
    this.users = '';
  }

  ngOnInit(): void {
  }

  loginSent(): void {
        if (this.loginInfo?.valid) {
          this.requests.loginService(this.loginInfo?.value).subscribe(result => {
            this.chatNames.setUsers(result.usernames);
            this.chatNames.userInfo(result.user_id);
          });

        }
  }
}
