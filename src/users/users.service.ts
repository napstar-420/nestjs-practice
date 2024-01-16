import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Zohaib Khan',
      email: 'zohaibkhan@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'ENGINEER',
    },
  ];

  findAllUsers(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const users = this.users.filter((user) => user.role === role);

      if (!users.length) {
        throw new NotFoundException('Users not found');
      }

      return users;
    }

    return this.users;
  }

  findUser(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  createUser(user: CreateUserDto) {
    const highestId = [...this.users].sort((a, b) => b.id - a.id)[0].id;

    const newUser = {
      id: highestId + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
        };
      }

      return user;
    });

    return this.findUser(id);
  }

  delete_user(id: number) {
    const removedUser = this.findUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
