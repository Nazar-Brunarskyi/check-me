import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CurrentUserService } from '../../../services/current-user.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private currentUserService = inject(CurrentUserService);
}
