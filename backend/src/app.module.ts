import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true, // No need to import ConfigModule in each module
    }
   
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
