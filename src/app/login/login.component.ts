import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'app/server/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  private loginError = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.loginService.login(this.username, this.password).then((value) => {
      this.router.navigate(['/plazza']); // navigate to plazza
      this.loginError = false;
    }).catch((reason) => {
      this.loginError = true;
      console.log('Login Error');
    });
  }

}

