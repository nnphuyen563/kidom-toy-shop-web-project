import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder:FormBuilder, 
    private router: Router,
    private userService: UserService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
    });
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    
    // alert(`email: ${this.fc['email'].value}, password: ${this.fc['password'].value}`)

    this.userService.login({
      email: this.fc.email.value,
      password: this.fc.password.value
    }).subscribe((user) => {
      if (user.isAdmin) {
        this.router.navigate(["admin"]); 
        return;
      }
      this.router.navigate(["/"]);
    });
  }
}
