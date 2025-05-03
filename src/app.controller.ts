import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MovieDto,fetchMovie } from './config/movie.dto';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/api/v1/saveMovie')
  saveMovie(@Body() body:MovieDto) {
    return this.appService.saveMovie(body);
  }

  @Get('/api/v1/fetchMovie')
  fetchMovie(@Query() query:fetchMovie) {
    return this.appService.fetchMovie(query);
  }
  @Get('')
  fetchStatus(){
    return {}
  }
}