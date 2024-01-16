import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  users: any[] = [];

  constructor(
    userServices: UserService
  ) {
    userServices.getUsers().subscribe((users) => {
      this.users = users;
    })
  }
}
