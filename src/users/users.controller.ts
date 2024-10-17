import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/utils/metadata';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public() // não precisa de token
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
