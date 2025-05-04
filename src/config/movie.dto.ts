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

    @IsString()
    quality:string
}

export class fetchMovie {
    @IsOptional()
    @IsString()
    movie_name: string;
}

export class JWJDto{
    @IsOptional()
    @IsString()
    e: string;

    @IsOptional()
    @IsString()
    kty: string;

    @IsOptional()
    @IsString()
    n: string;


}


