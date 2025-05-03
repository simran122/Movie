import { IsString , IsNumber,IsOptional} from 'class-validator';

export class MovieDto {
    @IsString()
    movie_link: string;

    @IsString()
    movie_name: string;

    @IsString()
    website:string

    @IsString()
    duration:string
    
    @IsString()
    thumbnail:string
}

export class fetchMovie {
    @IsOptional()
    @IsString()
    movie_name: string;
}


