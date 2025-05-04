import { Injectable } from '@nestjs/common';
import { Movie } from './Schema/movie.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MovieDto, fetchMovie ,JWJDto} from './config/movie.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  constructor(@InjectModel(Movie.name,CACHE_MANAGER) private movieModel: Model<Movie>, private cacheManager: Cache) {}

  async saveMovie(body: MovieDto): Promise<Movie | {}> {
    const existingMovie = await this.movieModel.findOne({ movie_link: body.movie_link }).exec();    
    if (existingMovie) {
      return {};
    }
    const movie = new this.movieModel(body);
    return movie.save();
  }

   fetchMovie(query: fetchMovie): Promise<Movie[]> {
    return this.movieModel.find(query).exec();
  }

  saveKeyInRedis(body:JWJDto){
    return this.cacheManager.set('public_key', JSON.stringify(body));
  }

  fetchKeyfromRedis(){
    return this.cacheManager.get('public_key');
  }
}