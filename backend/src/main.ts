import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // corsの設定
  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
