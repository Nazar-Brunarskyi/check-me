import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ISendCodeToTelegramDto } from '@check-me/models';
import { CardModule } from 'primeng/card';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { TelegramLoginService } from '../../../services/telegram-login.service';
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
          console.log('Error sending code');
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

    this.authService.loginWithCode({ authCodeId: authCodeId, code }, () => this.isLoggingIn.set(false));
  }
}
