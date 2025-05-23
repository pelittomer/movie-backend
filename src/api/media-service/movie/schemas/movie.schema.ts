import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Director } from "../../director/schemas/director.schema";
import { Actor } from "../../actor/schemas/actor.schema";
import { Upload } from "src/api/upload-service/upload/schemas/upload.schema";
import { Category } from "../../category/schemas/category.schema";

export type MovieDocument = Movie & Document

@Schema()
export class Movie {
    @Prop({ type: String, required: true, unique: true })
    title: string;

    @Prop({ type: String, required: true })
    synopsis: string;

    @Prop({ type: Number, required: true })
    duration: number;

    @Prop({ type: Number, min: 0, max: 10 })
    rate: number;

    @Prop({ type: String, required: true })
    trailer: string;

    @Prop({ type: String, required: true })
    countryOfOrigin: string;

    @Prop({ type: String, required: true })
    productionCompany: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: Category.name }], default: [] })
    category: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: Upload.name, required: true })
    poster: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Director.name, required: true })
    directors: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: Actor.name }], default: [] })
    cast: Types.ObjectId[]
}

export const MovieSchema = SchemaFactory.createForClass(Movie)