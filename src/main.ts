import 'module-alias/register';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function start(): Promise<void> {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SocCat')
    .setDescription('REST API Documentation')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  // eslint-disable-next-line no-console
  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

// eslint-disable-next-line no-console
start().catch(console.error);
