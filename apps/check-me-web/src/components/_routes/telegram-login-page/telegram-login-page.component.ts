import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TelegramLoginFormComponent } from '../../forms/telegram-login-form/telegram-login-form.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-telegram-login-page',
  imports: [CommonModule, CardModule, TelegramLoginFormComponent],
  templateUrl: './telegram-login-page.component.html',
})
export class TelegramLoginPageComponent {
  authService = inject(AuthService);
  authCodeId = input<string>();

}
