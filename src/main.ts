import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(process.cwd(), './src', 'public'));
  app.setBaseViewsDir(join(process.cwd(), './src', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
