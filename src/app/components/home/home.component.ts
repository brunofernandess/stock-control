import { Component, NgModule, inject } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from './../../services/user/user.service';
import { SignupUserResponse } from '../../models/interfaces/SignupUserResponse';
import { SignupUserRequest } from '../../models/interfaces/user/SignupUserRequest';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { Router } from '@angular/router';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    CardModule,
    InputTextModule,
    ButtonModule,


  ],
  providers: [BrowserAnimationsModule, CookieService, NgModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  loginCard = true;
  toaster = inject(ToastrService);

  loginForm = this.formBuilder.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private cookieService: CookieService,
    private router: Router,

  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.UserService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
            this.toaster.success('Usuário autenticado com sucesso!', 'Success');
            timeout(2000);


          }
        },
        error: (err) => {


          console.log(err);
        },
      });
    }
  }

  onSubmitSignupForm(): void {
    console.log('Form value:', this.signupForm.value);
    console.log('Form valid:', this.signupForm.valid);
    if (this.signupForm.value && this.signupForm.valid) {
      this.UserService.signupUser(this.signupForm.value as SignupUserRequest).subscribe({
        next: (response) => {
          this.toaster.success('Usuário criado com sucesso!', 'Success')
          timeout(2000);
          this.loginCard = true;


          if (response) {
            this.signupForm.reset();
          }
        },
        error: (err) => {
         this.toaster.error('User creation failed', 'Error');
        },
      });
        };

    }

  };
