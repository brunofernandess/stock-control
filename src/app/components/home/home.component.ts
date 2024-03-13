import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ToastModule } from 'primeng/toast';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from './../../services/user/user.service';
import { SignupUserResponse } from '../../models/interfaces/SignupUserResponse';
import { SignupUserRequest } from '../../models/interfaces/user/SignupUserRequest';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [BrowserAnimationsModule, CookieService, MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.UserService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Bem-vindo de volta ${response.name}!',
              life: 2000,
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao fazer login!',
            life: 2000,
          });
          console.log(err);
        },
      });
    }
  }

  onSubmitSignupForm(): void {
    // Verifica se o formulário de registro (signupForm) existe e se é válido
    if (this.signupForm.value && this.signupForm.valid) {
      // Chama um serviço chamado UserService para realizar o registro do usuário
      // O valor do formulário (signupForm.value) é passado como argumento para a função signupUser()
      this.UserService.signupUser(
        this.signupForm.value as SignupUserRequest
      ).subscribe({
        next: (response) => {
          if (response) {
            this.signupForm.reset();
            this.loginCard = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário criado com sucesso!',
              life: 2000,
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao criar usuário!',
            life: 2000,
          });
          console.log(err);
        },
      });
    }
  }
}
