import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 2121;
  await app.listen(port, () => {
    console.log(`NestJS start on port ${port}`);
  });
}
bootstrap();
