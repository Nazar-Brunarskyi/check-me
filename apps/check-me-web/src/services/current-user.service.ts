import { Injectable, inject, signal } from '@angular/core';
import { IGetMeResponseDto } from '@check-me/models';
import { AuthService } from './auth.service';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService extends BaseHttpService {
  authService = inject(AuthService);

  user = signal<IGetMeResponseDto | null | undefined>(undefined);

  constructor() {
    super();
    console.log(this.user());
  }

}
