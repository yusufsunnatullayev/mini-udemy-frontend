import { Component, inject, OnInit, signal } from '@angular/core';
import {
  LucideAngularModule,
  UserCheck,
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from 'lucide-angular';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '@core/services/toast.service';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, InputTextModule, ButtonModule],
})
export class RegisterComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  readonly authStore = inject(AuthStore);
  router = inject(Router);

  form = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  get fullName() {
    return this.form.get('fullName');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  UserCheckIcon = UserCheck;
  UserIcon = User;
  MailIcon = Mail;
  LockIcon = LockKeyhole;
  EyeIcon = Eye;
  EyeOffIcon = EyeOff;

  isPasswordVisible = signal(false);
  isConfirmPasswordVisible = signal(false);

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible.update((prev) => !prev);
  }

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

    if (this.password?.value !== this.confirmPassword?.value) {
      return this.toastService.error('Error', 'The passwords did not match!');
    }

    const credentials = {
      email: this.email?.value ?? '',
      password: this.password?.value ?? '',
      fullName: this.fullName?.value ?? '',
    };
    this.authStore.register(credentials);
  }
}
