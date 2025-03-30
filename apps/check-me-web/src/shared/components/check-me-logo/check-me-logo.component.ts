import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-check-me-logo',
  imports: [CommonModule, RouterLink],
  templateUrl: './check-me-logo.component.html',
})
export class CheckMeLogoComponent {
  navigateTo = input<string | null>(null);
}
