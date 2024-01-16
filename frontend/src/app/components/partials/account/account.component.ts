import { Component } from '@angular/core';

@Component({
  selector: 'app-partials-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class PartialsAccountComponent {
  constructor() { }
  
  menuVariable:boolean = false;
  menu_icon_variable: boolean = false;
  menuActive: boolean = false;
  openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
    this.menuActive = !this.menuActive;
  }
}
