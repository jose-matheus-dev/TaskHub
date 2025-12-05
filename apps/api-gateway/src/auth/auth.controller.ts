import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDTO, RefreshDTO, RegisterDTO } from '@repo/types';
import { lastValueFrom } from 'rxjs';
import { RpcToHttpFilter } from '../filters/rcp-to-http.filter';

@UseFilters(RpcToHttpFilter)
@Controller('api/auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return await lastValueFrom(this.client.send('auth.register', body));
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const res = await lastValueFrom(this.client.send('auth.login', body));
    return res;
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshDTO) {
    const res = await lastValueFrom(this.client.send('auth.refresh', body));
    return res;
  }
}
