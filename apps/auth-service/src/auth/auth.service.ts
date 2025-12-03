import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { LoginDto, RefreshDto, RegisterDto } from 'src/auth/auth.dto';
import { Token } from 'src/models/token.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
  ) {}

  async register({ username, email, password }: RegisterDto) {
    const user = await this.userRepo.findOne({ where: [{ email }, { username }] });
    if (user) throw new ConflictException(`${user.email === email ? 'Email' : 'Username'} already in use.`);

    //  TODO: Send Verification token email

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepo.save({ username, email, password: hashedPassword });
  }
  async login({ email, password }: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email } });

    const isValid = user && (await bcrypt.compare(password, user.password));
    if (!isValid) throw new UnauthorizedException('Invalid email or password.');

    await this.tokenRepo.delete({ userId: user.id });

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15min' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.tokenRepo.save({ token: hashedRefreshToken, userId: user.id, expiresAt });

    return { accessToken, refreshToken };
  }
  async refresh({ refreshToken }: RefreshDto) {
    let payload: { sub: string; email: string };
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token.');
    }
    const storedToken = await this.tokenRepo.findOne({ where: { userId: payload.sub } });
    if (!storedToken || storedToken.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Invalid refresh token.');
    }
    const isValidToken = await bcrypt.compare(refreshToken, storedToken.token);
    if (!isValidToken) throw new UnauthorizedException('Invalid refresh token.');

    payload = { sub: payload.sub, email: payload.email };
    return { accessToken: this.jwtService.sign(payload, { expiresIn: '15min' }) };
  }
}
