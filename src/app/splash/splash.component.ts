import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarRef, MdSnackBarConfig } from '@angular/material';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  private ref: MdSnackBarRef<any>;

  constructor(private snackBar: MdSnackBar, private router: Router) { }
  answerChosen() {
    if (this.ref) { this.ref.dismiss(); };

    let config = new MdSnackBarConfig();

    config.duration = 5000;

    this.ref = this.snackBar.open('Now sign in to save your stats.', null, config);
    this.router.navigate(['/login/sign-up']);
  }

  ngOnInit() {
  }

}
