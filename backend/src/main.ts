import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get('NEST_SERVER_PORT');
  const globalPrefix = process.env.NEST_SERVER_GLOBAL_PREFIX ||'api';
  app.setGlobalPrefix(globalPrefix);

  

  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build()
  ;
const document = SwaggerModule.createDocument(app, config,{
  ignoreGlobalPrefix: true
});
SwaggerModule.setup('api', app, document);

// await app.listen(port, () => {
//   Logger.log('Listening at http://localhost:' + port);
// });
  
await app.listen(port, () => {
  Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
});

}
bootstrap();
