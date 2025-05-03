import { Injectable } from '@nestjs/common';
import { Movie } from './Schema/movie.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MovieDto, fetchMovie } from './config/movie.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async saveMovie(body: MovieDto): Promise<Movie> {
    const movie = new this.movieModel(body);
    return movie.save();
  }

  async fetchMovie(query: fetchMovie): Promise<Movie[]> {
    return this.movieModel.find(query).exec();
  }
}