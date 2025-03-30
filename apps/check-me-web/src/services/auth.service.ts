import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IJwtTokenPayload, ILoginWithCodeDTO, ITokensResponseDTO } from '@check-me/models';
import { decodeToken } from '@check-me/utils/auth/JWT/decode-token';
import { catchError, tap, throwError } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  private router = inject(Router);

  public user = signal<IJwtTokenPayload | null>(null);

  constructor() {
    super();
    const { accessToken } = this.getTokens;

    if (accessToken) {
      this.user.set(decodeToken(accessToken));
    }
  }

  loginWithCode(data: ILoginWithCodeDTO) {
    return this.post<ITokensResponseDTO>('auth/login-with-code', data).pipe(
      tap((data) => {
        this.#saveTokens(data);
        this.router.navigate(['/']);
      }),
    );
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

  get userPayload() {
    const accessToken = this.getTokens.accessToken;
    if (accessToken) {
      return decodeToken(accessToken);
    }

    return null;
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

    this.user.set(decodeToken(data.accessToken));
  }

  #removeTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.user.set(null);
  }
}
