
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';






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
  providers: [BrowserAnimationsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({

    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  signupForm = this.formBuilder.group({

    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder) { }

  onSubmitLoginForm(): void {
    console.log('DADOS DO FORMULÁRIO DE LOGIN', this.loginForm.value);
  }


  onSubmitSignupForm(): void {
    console.log('DADOS DO FORMULÁRIO DE CADASTRO', this.signupForm.value);
  }
}
