import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedUtilsModule
  ],
  exports: [UserRepository]
})
export class UserModule { }
