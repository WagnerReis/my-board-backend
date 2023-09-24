import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.findByEmail(createUserDto.email);

    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const newUser = {
      ...createUserDto,
      password: hash,
    };

    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  findOne(id: string) {
    const user = this.userModel.findOne({
      _id: id,
    });

    return user;
  }

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.userModel.findOne({
      email,
    });

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, { $set: updateUserDto });
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
