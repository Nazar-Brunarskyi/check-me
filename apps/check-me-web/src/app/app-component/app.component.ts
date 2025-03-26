import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ENVIRONMENT_CONFIG } from '../../injection-tokens/environment.token';

@Component({
  imports: [RouterModule, ButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly environmentConfig = inject(ENVIRONMENT_CONFIG);
  title = 'check-me-web';
}
