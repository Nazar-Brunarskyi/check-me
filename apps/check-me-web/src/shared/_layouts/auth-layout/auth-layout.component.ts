import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckMeLogoComponent } from '../../components/check-me-logo/check-me-logo.component';

@Component({
  selector: 'app-auth-layuot',
  imports: [CommonModule, RouterOutlet, CheckMeLogoComponent],
  templateUrl: './auth-layuot.component.html',
})
export class AuthLayoutComponent {}
