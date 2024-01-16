import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user!: User
  constructor(private userService: UserService) 
  {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }
   
  menuVariable:boolean = false;
  menu_icon_variable: boolean = false;
  menuActive: boolean = false;
  openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
    this.menuActive = !this.menuActive;
  }

  logout() {
    this.userService.logout();
  }
  
  get isAuth() {
    return this.user.token;
  }
}
