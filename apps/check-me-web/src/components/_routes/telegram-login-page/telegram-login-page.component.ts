import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ISendCodeToTelegramDto } from '@check-me/models';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { finalize } from 'rxjs';
import { TelegramLoginService } from '../../../services/telegram-login.service';
import { AuthService } from '../../../shared/services/auth.service';
import { TelegramLoginFormComponent } from '../../forms/telegram-login-form/telegram-login-form.component';

@Component({
  selector: 'app-telegram-login-page',
  imports: [CommonModule, CardModule, TelegramLoginFormComponent],
  templateUrl: './telegram-login-page.component.html',
})
export class TelegramLoginPageComponent {
  private router = inject(Router);
  private telegramLoginService = inject(TelegramLoginService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  authCodeId = input<string>();

  showEnterCodeState = computed(() => !!this.authCodeId());
  isSendingCode = signal<boolean>(false);
  isLoggingIn = signal<boolean>(false);

  sendCode(data: ISendCodeToTelegramDto) {
    this.isSendingCode.set(true);

    this.telegramLoginService
      .sendCodeToTelegram(data)
      .pipe(
        finalize(() => {
          this.isSendingCode.set(false);
        }),
      )
      .subscribe({
        next: (data) => {
          const authCodeId = data.authCodeId;
          this.router.navigate([], {
            queryParams: { authCodeId },
            queryParamsHandling: 'replace',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to send code',
            detail: 'Check the number, please, and try again.',
          });
        },
      });
  }

  handleLogin(code: string): void {
    const authCodeId = this.authCodeId();

    if (!authCodeId || !code) {
      console.error('authCodeId or code is missing');
      return;
    }
    this.isLoggingIn.set(true);

    this.authService
      .loginWithCode({ authCodeId: authCodeId, code })
      .pipe(finalize(() => this.isLoggingIn.set(false)))
      .subscribe({
        error: (error) => {
          if (error.status === 401) {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to login',
              detail: 'Invalid code. Please try again',
            });
            return;
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while processing your request. Please try again.',
          });
        },
      });
  }
}
