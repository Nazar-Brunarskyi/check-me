import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { MenuAvatarComponent } from '../menu-avatar/menu-avatar.component';
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, MenuAvatarComponent, ButtonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  private user = this.authService.user;

  public renderMenuAvatar = computed(() => !!this.user());

  login() {
    this.router.navigate(['/auth']);
  }
}
