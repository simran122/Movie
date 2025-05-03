import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
    timestamps:true,
    collection:'movies'
})
export class Movie{
    @Prop({required:true,unique:true})
    movie_link:string

    @Prop({required:true})
    movie_name:string

    @Prop({})
    website:string

    @Prop({})
    duration:string
    
    @Prop({})
    thumbnail:string
}

export const MovieSchema = SchemaFactory.createForClass(Movie);