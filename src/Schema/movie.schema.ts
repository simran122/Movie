import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
    timestamps:true,
    collection:'movies'
})
export class Movie{
    @Prop({required:true})
    movie_link:string

    @Prop({required:true})
    movie_name:string
}

export const MovieSchema = SchemaFactory.createForClass(Movie);