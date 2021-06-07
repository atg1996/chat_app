import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RequestsService } from '../requests.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  forma = this.formBuilder.group({
    fullName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private requests: RequestsService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  registerFunction(): any {
    if (this.forma?.valid) {
      this.requests.sendRegisterInfo(this.forma?.value).subscribe(result => {
        console.log(result); });
    } else {
      alert('Please fill all fields ');
    }
  }

}
