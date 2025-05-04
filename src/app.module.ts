import { Module,MiddlewareConsumer,RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';
import { Movie,MovieSchema } from './Schema/movie.schema';
import { AuthMiddleware } from './core/auth.middleware';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri as string),
    MongooseModule.forFeature([{name:Movie.name,schema:MovieSchema}]),
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({path:'/api/v1/savePublicKey',method: RequestMethod.POST})
      .forRoutes(
        { path: '/api/v1/*', method: RequestMethod.GET },
        { path: '/api/v1/*', method: RequestMethod.POST }
      )
        
}
}
