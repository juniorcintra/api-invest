import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WalletsModule } from './wallets/wallets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, WalletsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
