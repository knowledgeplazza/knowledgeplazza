import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <span fxShow="false" fxShow.xs> XS </span>
  <span fxShow="false" fxShow.sm> SM </span>
  <span fxShow="false" fxShow.md> MD </span>
  <span fxShow="false" fxShow.lg> LG </span>
  <span fxShow="false" fxShow.xl> XL </span>
  <router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor() { }
}
