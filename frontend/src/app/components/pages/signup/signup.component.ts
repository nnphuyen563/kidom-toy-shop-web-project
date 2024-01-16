import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validator';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  SignupForm!:FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder:FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.SignupForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      phonenumber:['', Validators.required],
      name:['', Validators.required],
      confirmPassword:['', Validators.required],
    }, {
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    }
    ); 
  }

  get fc() {
    return this.SignupForm.controls;
  }

  submit(){
    this.isSubmitted = true;

    if (this.SignupForm.invalid) {
      console.log("AAAAA");
      return;
    }

    // alert(`email: ${this.fc['email'].value}, password: ${this.fc['password'].value} 
    // Mời bạn đăng nhập lại`);
    
    const fv = this.SignupForm.value;

    const user:IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmedPassword: fv.confirmedPassword,
      phone: fv.phonenumber
    }

    

    this.userService.register(user).subscribe(_ => {
      this.router.navigate(["/"]);
    })

  }
}

