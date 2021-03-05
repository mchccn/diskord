import { ObjectId } from "mongodb";
import { Document, Model, model, models, Schema } from "mongoose";
import { Permissions } from "../../types";

export interface IRole extends Document {
    guild: string;
    name: string;
    color: string;
    permissions: Permissions[];
}

export const roleSchema = new Schema({
    guild: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    permissions: {
        type: [String],
        required: true,
    },
});

const roles = (models["roles"] as Model<IRole>) || model<IRole>("roles", roleSchema);

export default roles;
