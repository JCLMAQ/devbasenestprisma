import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { AuthsModule } from './auths/auths.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true, // No need to import ConfigModule in each module
    }
   
  ),
    UsersModule,
    UtilitiesModule,
    AuthsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
