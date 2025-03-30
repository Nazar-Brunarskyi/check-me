import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';

@Component({
  imports: [RouterModule, ButtonModule, Toast],
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast position="bottom-right" />
  `,
})
export class AppComponent {}
