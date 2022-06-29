import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailerModule.forRoot({
      transport: {
        host: process.env.SENDGRID_SERVER,
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_API_KEY,
        },
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
