import { Injectable } from '@angular/core';
import { ILoginResponseDTO, ILoginWithCodeDTO } from '@check-me/models';
import { finalize } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  loginWithCode(data: ILoginWithCodeDTO, finalizeCallback?: () => void) {
    return this.post<ILoginResponseDTO>('auth/login-with-code', data)
      .pipe(finalize(() => finalizeCallback?.()))
      .subscribe({
        error: () => {
          console.error('Error logging in');
        },
        next: (data) => {
          this.#saveTokens(data);
        },
      });
  }

  #saveTokens(data: ILoginResponseDTO) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }
}
