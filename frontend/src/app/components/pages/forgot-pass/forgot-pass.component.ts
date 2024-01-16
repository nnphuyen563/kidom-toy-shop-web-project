import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { USERS } from '../../../../data';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
  forgetPasswordForm: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get fc() {
    return this.forgetPasswordForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.forgetPasswordForm.invalid) return;

    const userEmail = this.fc.email.value;
    const user = USERS.find(u => u.email === userEmail);

    if (user) {
      // Hiển thị mật khẩu trong một cửa sổ modal hoặc thông báo
      this.showPassword(user.password);
    } else {
      this.showErrorMessage({ message: 'Email không tồn tại.' });
    }
  }

  showPassword(password: string) {
    alert(`Mật khẩu của bạn là: ${password}`);
  }

  showErrorMessage(error: any) {
    // Thực hiện hiển thị thông báo lỗi, có thể sử dụng modal hoặc alert
    alert('Có lỗi xảy ra: ' + error.message);
  }
}
