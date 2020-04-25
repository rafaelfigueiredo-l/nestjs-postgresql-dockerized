import { GetUser } from './get-user.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './../dto/auth-credentials.dto';
import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  private logger = new Logger('TasksController');
  constructor(private AuthService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.AuthService.signUp(AuthCredentialsDto);
    console.log(AuthCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.AuthService.signIn(AuthCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
