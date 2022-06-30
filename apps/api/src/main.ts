import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3005;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  console.log(`Listen on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
