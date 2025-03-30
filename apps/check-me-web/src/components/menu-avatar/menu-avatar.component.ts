import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-avatar',
  imports: [CommonModule, AvatarModule, Menu],
  templateUrl: './menu-avatar.component.html',
})
export class MenuAvatarComponent {
  private aithService = inject(AuthService);

  user = this.aithService.user();

  public avatarLabel = computed(() => {
    const firstName = this.user?.firstName;
    const lastName = this.user?.lastName;

    const firstNameFirstLetter = firstName?.charAt(0);

    const lastNameFirstLetter = lastName?.charAt(0);

    const label = `${firstNameFirstLetter || ''}${lastNameFirstLetter || ''}`;
    console.log(label || undefined);

    return label || undefined;
  });

  public items: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.aithService.logout();
      },
    },
  ];
}
