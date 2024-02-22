import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcryptjs';
  import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
  import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
  import { NullableType } from '../utils/types/nullable.type';
  import { LoginResponseType } from './types/login-response.type';
  import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
  import { JwtPayloadType } from './strategies/types/jwt-payload.type';
  import { User } from 'src/users/domain/user';
  import { Session } from '../sessions/domain/session'
  import { UsersService } from 'src/users/users.service';
  import { SessionService } from '../sessions/sessions.service';
  import configuration from '../config/index';
import { RegisterResponseType } from './types/register-response.type';
import ms from 'ms';
  
  @Injectable()
  export class AuthService {
    constructor(
      private jwtService: JwtService,
      private usersService: UsersService,
      private sessionService: SessionService,
    ) {}
  
    async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseType> {
      const user = await this.usersService.findOne({
        email: loginDto.email,
      });
  
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              email: 'notFound',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
  
      if (!user.password) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              password: 'incorrectPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
  
      const isValidPassword = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
  
      if (!isValidPassword) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              password: 'incorrectPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
  
      const session = await this.sessionService.create({
        user,
      });
  
      const { token, refreshToken, tokenExpires } = await this.getTokensData({
        id: user.id,
        sessionId: session.id,
      });
  
      return {
        refreshToken,
        token,
        tokenExpires,
        user,
      };
    }

  
    async register(dto: AuthRegisterLoginDto): Promise<RegisterResponseType> {
      const existingUser = await this.usersService.findByEmail({
          email:dto.email
      });

      if (existingUser) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              email: 'Email already exists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

 
      const newUser = await this.usersService.create(dto);
  
      const session = await this.sessionService.create({
          user: newUser,
      });
  
      const { token, refreshToken, tokenExpires } = await this.getTokensData({
          id: newUser.id,
          sessionId: session.id,
      });
  
      return {
          refreshToken,
          token,
          tokenExpires,
          user: newUser,
      };
    }
   
    async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
      return this.usersService.findOne({
        id: userJwtPayload.id,
      });
    }
  
    async refreshToken(
      data: Pick<JwtRefreshPayloadType, 'sessionId'>,
    ): Promise<Omit<LoginResponseType, 'user'>> {
      const session = await this.sessionService.findOne({
        id: data.sessionId,
      });
  
      if (!session) {
        throw new UnauthorizedException();
      }
  
      const { token, refreshToken, tokenExpires } = await this.getTokensData({
        id: session.user.id,
        sessionId: session.id,
      });
  
      return {
        token,
        refreshToken,
        tokenExpires,
      };
    }
  
    async softDelete(user: User): Promise<void> {
      await this.usersService.softDelete(user.id);
    }
  
    async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
      return this.sessionService.softDelete({
        id: data.sessionId,
      });
    }
  
    private async getTokensData(data: {
      id: User['id'];
      sessionId: Session['id'];
    }) {
      const tokenExpiresIn = configuration.authToken.accessTokenExpiresIn;
  
      const tokenExpires = Date.now()+ms(tokenExpiresIn)

      const [token, refreshToken] = await Promise.all([
        await this.jwtService.signAsync(
          {
            id: data.id,
            sessionId: data.sessionId,
          },
          {
            secret: configuration.authToken.accessTokenSecret,
            expiresIn: tokenExpiresIn,
          },
        ),
        await this.jwtService.signAsync(
          {
            sessionId: data.sessionId,
          },
          {
            secret: configuration.authToken.refreshTokenSecret,
            expiresIn:configuration.authToken.accessTokenExpiresIn
          },
        ),
      ]);
  
      return {
        token,
        refreshToken,
        tokenExpires,
      };
    }
  }
  