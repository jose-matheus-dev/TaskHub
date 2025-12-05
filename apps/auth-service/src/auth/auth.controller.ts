import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDTO, RefreshDTO, RegisterDTO } from '@repo/types';
import { AuthService } from 'src/auth/auth.service';
import { HttpToRpcFilter } from 'src/http-to-rpc.filter';

@UseFilters(HttpToRpcFilter)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async register(data: RegisterDTO) {
    return await this.authService.register(data);
  }
  @MessagePattern('auth.login')
  async login(data: LoginDTO) {
    return this.authService.login(data);
  }
  @MessagePattern('auth.refresh')
  async refresh(data: RefreshDTO) {
    return this.authService.refresh(data);
  }
}
