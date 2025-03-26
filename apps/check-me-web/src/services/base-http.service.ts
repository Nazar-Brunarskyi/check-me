import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENVIRONMENT_CONFIG } from '../injection-tokens/environment.token';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  private readonly environmentConfig = inject(ENVIRONMENT_CONFIG);
  private http = inject(HttpClient);
  private readonly baseUrl = this.environmentConfig.apiUrl;

  protected get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, { params }).pipe(catchError(this.handleError));
  }

  protected post<T>(url: string, data: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, data).pipe(catchError(this.handleError));
  }

  protected put<T>(url: string, data: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`, data).pipe(catchError(this.handleError));
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
