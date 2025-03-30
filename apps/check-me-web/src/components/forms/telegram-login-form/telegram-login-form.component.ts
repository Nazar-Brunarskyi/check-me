import { CommonModule } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISendCodeToTelegramDto } from '@check-me/models';
import { ButtonModule } from 'primeng/button';
import { CodeInputComponent } from '../../code-input/code-input.component';
import { InputComponent } from '../../input/input.component';

@Component({
  selector: 'app-telegram-login-form',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonModule, CodeInputComponent],
  templateUrl: './telegram-login-form.component.html',
})
export class TelegramLoginFormComponent {
  private formBuilder = inject(FormBuilder);

  showEnterCodeState = input<boolean>(false);
  isSendingCode = input<boolean>(false);
  isLoggingIn = input<boolean>(false);

  sendCode = output<ISendCodeToTelegramDto>();
  login = output<string>();

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

  codeForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
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

  handleSendCode(): void {
    this.validateForm();

    if (!this.telegramLoginForm.valid) return;

    this.sendCode.emit({ phoneNumber: ('+' + this.telegramLoginForm.get('phoneNumber')?.value) as string });
  }

  handleLogin(): void {
    if (this.codeForm.invalid) {
      console.error('Invalid code form');
      return;
    }

    this.login.emit(this.codeForm.get('code')?.value as string);
  }
}
