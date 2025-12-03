import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RpcToHttpFilter } from '../filters/rcp-to-http.filter';
import { LoginDto, RefreshDto, RegisterDto } from './auth.dto';

@UseFilters(RpcToHttpFilter)
@Controller('api/auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await lastValueFrom(this.client.send('auth-register', body));
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const res = await lastValueFrom(this.client.send('auth-login', body));
    return res;
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshDto) {
    const res = await lastValueFrom(this.client.send('auth-refresh', body));
    return res;
  }
}
