import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  UserCheck,
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, InputTextModule, ButtonModule],
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  readonly authStore = inject(AuthStore);
  router = inject(Router);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  UserCheckIcon = UserCheck;
  UserIcon = User;
  MailIcon = Mail;
  LockIcon = LockKeyhole;
  EyeIcon = Eye;
  EyeOffIcon = EyeOff;

  isPasswordVisible = signal(false);

  togglePasswordVisibility() {
    this.isPasswordVisible.update((prev) => !prev);
  }

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const credentials = {
      email: this.email?.value ?? '',
      password: this.password?.value ?? '',
    };

    this.authStore.login(credentials);
  }
}
