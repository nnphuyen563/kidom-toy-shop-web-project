import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  selectedTab: string = 'account-general'; // Mặc định là tab 'account-general'
  clickedTab: string = '';
  user!: User

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.clickedTab = tab;
  }
  constructor(private router: Router, private userService: UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }
  
  isAddAddressVisible: boolean = false;

  // Thêm phương thức saveChanges
  saveChanges() {
    // Logic để lưu thay đổi, bạn có thể thực hiện các thao tác cần thiết ở đây
    console.log('Changes saved!');
  }
  toggleNewAddress(){
    this.isAddAddressVisible =! this.isAddAddressVisible;
  }
  showAddressDetail(addressId: number) {
    // Sử dụng router để điều hướng đến trang chi tiết địa chỉ
    this.router.navigate(['/account/address', addressId]);
  }

  //click vào nhập địa chỉ mới thì mới hiện khung
  showNewAddressForm: boolean = false;

  toggleNewAddressForm() {
    this.showNewAddressForm = !this.showNewAddressForm;
  }

  
}
