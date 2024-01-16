import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users
  findAllUsers(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAllUsers(role);
  }

  @Get(':id') // GET /users/:id
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUser(id);
  }

  @Post() // POST /users
  createUser(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.usersService.createUser(user);
  }

  @Patch(':id') // PATCH /users/:id
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id') // DELETE /users/:id
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete_user(id);
  }
}
