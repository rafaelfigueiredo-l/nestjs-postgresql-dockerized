import { JwtPayload } from './jw-payload.interface';
import { AuthCredentialsDto } from './../dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private UserRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.UserRepository.signUp(AuthCredentialsDto);
  }

  async signIn(
    AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.UserRepository.validateUserPassword(
      AuthCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payLoad: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payLoad);
    this.logger.debug(
      `Generated JWT Token with payLoad ${JSON.stringify(payLoad)}`,
    );

    return { accessToken };
  }
}
