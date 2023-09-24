import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
