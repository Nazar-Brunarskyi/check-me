import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class TestService extends BaseHttpService {
  getTest() {
    return this.get<any>('');
  }
}
