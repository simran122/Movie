import { IsString ,IsOptional} from 'class-validator';

export class MovieDto {
    @IsString()
    movie_link: string;

    @IsString()
    movie_name: string;
}

export class fetchMovie {
    @IsOptional()
    @IsString()
    movie_name: string;
}


