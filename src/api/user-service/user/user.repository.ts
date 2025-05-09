import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async findByOrQuery(queryFields: Partial<Record<keyof User, any>>): Promise<UserDocument | null> {
        const orConditions = Object.keys(queryFields).map(key => ({
            [key]: queryFields[key]
        }))
        return await this.userModel.findOne({ $or: orConditions })
    }

    async create(userInputs: Partial<User>): Promise<UserDocument> {
        return await this.userModel.create(userInputs)
    }

    async findOne(query: Partial<User>): Promise<UserDocument | null> {
        return await this.userModel.findOne(query)
    }

    async findById(userId: Types.ObjectId): Promise<UserDocument | null> {
        return await this.userModel.findById(userId)
    }

    async findCurrentUser(userId: Types.ObjectId): Promise<Omit<UserDocument, 'emailVerificationToken'|'password'>> {
        return await this.userModel.findById(userId).select('-emailVerificationToken -password')
    }
}