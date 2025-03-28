import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TelegramLoginFormComponent } from '../../forms/telegram-login-form/telegram-login-form.component';

@Component({
  selector: 'app-telegram-login-page',
  imports: [CommonModule, CardModule, TelegramLoginFormComponent],
  templateUrl: './telegram-login-page.component.html',
})
export class TelegramLoginPageComponent {
  authCodeId = input<string>();
}
