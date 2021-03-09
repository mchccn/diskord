import { ObjectId } from "mongodb";
import { Document, Model, model, models, Schema } from "mongoose";
import { IRole, roleSchema } from "./role";

export interface IMember extends Document {
    user: string;
    guild: string;
    nickname?: string;
    roles: IRole[];
    createdAt: string;
    updatedAt: string;
}

export const memberSchema = new Schema(
    {
        user: {
            type: ObjectId,
            required: true,
        },
        guild: {
            type: ObjectId,
            required: true,
        },
        nickname: {
            type: String,
            default: null,
        },
        roles: {
            type: [roleSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const members = (models["members"] as Model<IMember>) || model<IMember>("members", memberSchema);

export default members;
