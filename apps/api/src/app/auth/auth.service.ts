import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(dto: RegisterDto) {
    return this.usersService.create(dto);
  }
}
