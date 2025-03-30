import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layuot',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth-layuot.component.html',
})
export class AuthLayoutComponent {}
