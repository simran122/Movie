import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MovieDto,fetchMovie } from './config/movie.dto';

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/saveMovie')
  saveMovie(@Body() body:MovieDto) {
    return this.appService.saveMovie(body);
  }

  @Get('/fetchMovie')
  fetchMovie(@Query() query:fetchMovie) {
    return this.appService.fetchMovie(query);
  }
}