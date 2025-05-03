import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptor';
import helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({limit:'10mb'}));
  app.enableCors({
    origin: '*',  // Allow all origins (not recommended for production)
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  });
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
