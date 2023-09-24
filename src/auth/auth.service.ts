import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  getSecret(): string {
    return this.configService.get<string>('SECRET_KEY');
  }

  async signIn(email, pass) {
    const user = await this.userService.findByEmail(email);

    const hash = user.password;
    const validUserPassword = await bcrypt.compare(pass, hash);

    if (!validUserPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
