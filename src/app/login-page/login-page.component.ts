import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import { RequestsService } from '../../services/requests.service';
import { ChatNamesService } from '../../services/chat-names.service';

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

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private requests: RequestsService,
    private chatNames: ChatNamesService
  ) {
    this.users = '';
  }

  ngOnInit(): void {
  }

  loginSent(): void {
        if (this.loginInfo?.valid) {
          this.requests.loginService(this.loginInfo?.value).subscribe((result) => {
            if (result.success) {
              this.chatNames.userInfo(result.user_id);
            }
            this.router.navigateByUrl('chatroom');
          });
        }
  }
}
