import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@flowbase/shared-database';
import { UserDto } from '@flowbase/shared-dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: RegisterDto): Promise<UserDto> {
    // Reject duplicate
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered.');
    }

    // hash password
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // store user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        displayName: dto.displayName,
        passwordHash,
      },
    });

    // return safe obj
    return {
      id: user.id,
      email: user.email,
      name: user.name ?? '',
      displayName: user.displayName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
