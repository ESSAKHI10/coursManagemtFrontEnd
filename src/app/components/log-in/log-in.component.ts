import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: User = new User();
  constructor(private http: HttpClient, private route: ActivatedRoute ,
    private router: Router ) {}

  ngOnInit() {}   

//access_token
  onSubmit() {
    console.log(this.user);
    this.http
      .post("http://localhost:3000/auth/login", this.user)
      .subscribe((res:any) => {
        console.log(res);
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("username", res["username"]);
        localStorage.setItem("email", res['email']);
        this.router.navigate(['/home']);
      });
  }

}
