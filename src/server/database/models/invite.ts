import { ObjectId } from "mongodb";
import { Document, Model, model, models, Schema } from "mongoose";

export interface IInvite extends Document {
    guild: string;
    createdAt: string;
    updatedAt: string;
}

export const inviteSchema = new Schema(
    {
        guild: {
            type: ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const invites = (models["invites"] as Model<IInvite>) || model<IInvite>("invites", inviteSchema);

export default invites;
