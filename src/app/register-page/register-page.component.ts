import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RequestsService} from '../../services/requests.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  forma = this.formBuilder.group({
    fullName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private requests: RequestsService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  registerFunction(): void {
    if (this.forma?.valid) {
      console.log(this.forma?.value);
      this.requests.sendRegisterInfo(this.forma?.value).subscribe(res => {
        if (res.success) {
          this.router.navigateByUrl('/login');
        }
      });
    } else {
      alert('Please fill all fields ');
    }
  }

}
