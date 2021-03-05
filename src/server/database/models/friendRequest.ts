import { ObjectId } from "mongodb";
import { Document, Model, model, models, Schema } from "mongoose";

export interface IFriendRequest extends Document {
    receiver: string;
    user: string;
}

export const friendRequestSchema = new Schema({
    receiver: {
        type: ObjectId,
        required: true,
    },
    user: {
        type: ObjectId,
        required: true,
    },
});

const friendRequests =
    (models["friendRequests"] as Model<IFriendRequest>) || model<IFriendRequest>("friendRequests", friendRequestSchema);

export default friendRequests;
