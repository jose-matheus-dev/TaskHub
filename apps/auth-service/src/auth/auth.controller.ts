import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto, RefreshDto, RegisterDto } from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { HttpToRpcFilter } from 'src/http-to-rpc.filter';

@UseFilters(HttpToRpcFilter)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth-register')
  async register(data: RegisterDto) {
    return await this.authService.register(data);
  }
  @MessagePattern('auth-login')
  async login(data: LoginDto) {
    return this.authService.login(data);
  }
  @MessagePattern('auth-refresh')
  async refresh(data: RefreshDto) {
    return this.authService.refresh(data);
  }
}
