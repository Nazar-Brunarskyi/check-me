import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginWithCodeDTO, ITokensResponseDTO } from '@check-me/models';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  private router = inject(Router);

  loginWithCode(data: ILoginWithCodeDTO, finalizeCallback?: () => void) {
    return this.post<ITokensResponseDTO>('auth/login-with-code', data)
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

  refresh() {
    return this.post<ITokensResponseDTO>(
      'auth/refresh',
      {},
      { headers: { Authorization: `Bearer ${this.getTokens.refreshToken}` } },
    ).pipe(
      tap((data) => {
        this.#saveTokens(data);
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      }),
    );
  }

  logout() {
    this.#removeTokens();
    this.router.navigate(['/auth']);
  }

  get getTokens() {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }

  #saveTokens(data: ITokensResponseDTO) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  #removeTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
