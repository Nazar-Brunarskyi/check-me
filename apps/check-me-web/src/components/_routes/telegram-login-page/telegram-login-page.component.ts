import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../input/input.component';

@Component({
  selector: 'app-telegram-login-page',
  imports: [CommonModule, CardModule, ReactiveFormsModule, InputComponent],
  templateUrl: './telegram-login-page.component.html',
  styleUrls: ['./telegram-login-page.component.scss'],
})
export class TelegramLoginPageComponent {
  private formBuilder = inject(FormBuilder);

  phoneNumberErrorMessages = signal<string | null>('');

  telegramLoginForm = this.formBuilder.group({
    phoneNumber: [
      { value: '', disabled: false },
      [
        Validators.pattern(/^\+?[1-9]\d{1,14}$/), // International E.164 format
        Validators.minLength(10),
        Validators.maxLength(15),
      ],
    ],

    phoneNumber2: [
      '',
      [
        Validators.pattern(/^\+?[1-9]\d{1,14}$/), // International E.164 format
        Validators.minLength(10),
        Validators.maxLength(15),
      ],
    ],
  });

  getphoneNumberErrorMessage(): string | null {
    const phoneNumber = this.telegramLoginForm.get('phoneNumber');
    if (phoneNumber?.hasError('required')) {
      return 'You must enter a value';
    }

    if (phoneNumber?.hasError('pattern')) {
      return 'Invalid phone number';
    }

    if (phoneNumber?.hasError('minlength')) {
      return 'Phone number must be at least 10 characters';
    }

    if (phoneNumber?.hasError('maxlength')) {
      return 'Phone number must be at most 15 characters';
    }

    return null;
  }

  validateForm(): void {
    this.phoneNumberErrorMessages.set(this.getphoneNumberErrorMessage());
  }

  onSubmit(): void {
    this.validateForm();

    // console.log(this.telegramLoginForm.value);
  }
}
