import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputComponent } from '../../input/input.component';

@Component({
  selector: 'app-telegram-login-form',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonModule],
  templateUrl: './telegram-login-form.component.html',
})
export class TelegramLoginFormComponent {
  private formBuilder = inject(FormBuilder);

  phoneNumberErrorMessage = signal<string | null>(null);

  telegramLoginForm = this.formBuilder.group({
    phoneNumber: [
      { value: '', disabled: false },
      [
        Validators.required,
        Validators.pattern(/^\+?[1-9]\d{1,14}$/), // International E.164 format
        Validators.minLength(10),
        Validators.maxLength(15),
      ],
    ],
  });

  getphoneNumberErrorMessage(): string | null {
    const phoneNumber = this.telegramLoginForm.get('phoneNumber');
    if (phoneNumber?.hasError('required')) {
      return 'You must enter a phone number';
    }

    if (phoneNumber?.hasError('minlength')) {
      return 'Phone number must be at least 10 characters';
    }

    if (phoneNumber?.hasError('maxlength')) {
      return 'Phone number must be at most 15 characters';
    }

    if (phoneNumber?.hasError('pattern')) {
      return 'Invalid phone number';
    }

    return null;
  }

  validateForm() {
    this.phoneNumberErrorMessage.set(this.getphoneNumberErrorMessage());
  }

  sendCode(): void {
    this.validateForm();

    if (!this.telegramLoginForm.valid) return;

    console.log('sendCode');
  }
}
