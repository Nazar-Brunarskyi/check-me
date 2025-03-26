import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ENVIRONMENT_CONFIG } from '../../injection-tokens/environment.token';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  imports: [RouterModule, ButtonModule, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly environmentConfig = inject(ENVIRONMENT_CONFIG);
  title = 'check-me-web';
}
