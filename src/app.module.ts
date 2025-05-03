import { Module,MiddlewareConsumer ,RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';
import { Movie,MovieSchema } from './Schema/movie.schema';
import { AuthMiddleware } from './core/auth.middleware';


@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri as string),
    MongooseModule.forFeature([{name:Movie.name,schema:MovieSchema}])
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/v1/*', method: RequestMethod.GET },
        { path: '/api/v1/*', method: RequestMethod.POST }
      )
        
}
}
