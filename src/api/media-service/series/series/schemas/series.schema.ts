import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Actor } from "src/api/media-service/actor/schemas/actor.schema";
import { Category } from "src/api/media-service/category/schemas/category.schema";
import { Upload } from "src/api/upload-service/upload/schemas/upload.schema";

export type SeriesDocument = Series & Document

@Schema()
export class Series {
    @Prop({ type: String, required: true, unique: true })
    title: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: Category.name }], default: [] })
    category: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: Upload.name, required: true })
    poster: Types.ObjectId;

    @Prop({ type: String, required: true })
    synopsis: string;

    @Prop({ type: Types.ObjectId, ref: 'Director', required: true })
    directors: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: Actor.name }], default: [] })
    cast: Types.ObjectId[]

    @Prop({ type: Number, default: 0 })
    rate: number;

    @Prop({ type: String, required: true })
    countryOfOrigin: string;

    @Prop({ type: String })
    productionCompany?: string;

    @Prop({ type: String })
    trailer?: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series)