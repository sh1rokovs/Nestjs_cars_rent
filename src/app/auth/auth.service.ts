import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(createUser: CreateUserDto): Promise<object> {
    const user = await this.validateUser(createUser);

    return this.generateToken(user);
  }

  async registration(createUser: CreateUserDto): Promise<object> {
    const candidateEmail = await this.usersService.getUserByEmail(
      createUser.email,
    );
    const candidateUsername = await this.usersService.getUserByEmail(
      createUser.username,
    );

    if (candidateEmail) {
      throw new HttpException(
        'Пользователь с таким Email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (candidateUsername) {
      throw new HttpException('Логин занят', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(createUser.password, 5);
    const user = await this.usersService.createUser({
      ...createUser,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<object> {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(createUser: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(createUser.email);
    const passwordEquals = await bcrypt.compare(
      createUser.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Неккректный логин или пароль',
    });
  }
}
