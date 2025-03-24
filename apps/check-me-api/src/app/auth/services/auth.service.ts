import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser() {
    return;
  }

  async login() {
    return;
  }

  async register() {
    return;
  }

  async refresh() {
    return;
  }
}
