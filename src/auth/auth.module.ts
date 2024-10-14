import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthGuard } from './auth.guard';
// import { SubscriptionService } from 'src/subscription/subscription.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    { provide: 'APP_GUARD', useClass: AuthGuard },
    // SubscriptionService,
  ],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
