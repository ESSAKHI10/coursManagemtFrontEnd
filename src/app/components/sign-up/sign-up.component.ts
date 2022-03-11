import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userRegistrationForm: FormGroup = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
  });

  user: User = new User();
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userRegistrationForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  signUp() {
    const  formData: any = new FormData();
    formData.append(
      'username',
      this.userRegistrationForm.get('username')?.value
    );
    formData.append('email', this.userRegistrationForm.get('email')?.value);
    formData.append(
      'password',
      this.userRegistrationForm.get('password')?.value
    );

    console.log(this.userRegistrationForm.get('email')?.value);
    console.log(this.userRegistrationForm.get('password')?.value);
    console.log(this.userRegistrationForm.get('username')?.value);
    console.log(formData);

    this.http.post('http://localhost:3000/users', formData).subscribe(
      (res: any) => {
        this.router.navigate(['/log-in']);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
}
