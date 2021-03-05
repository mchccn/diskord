import { ObjectId } from "mongodb";
import { Document, model, Model, models, Schema } from "mongoose";
import { IMessage, messageSchema } from "./message";

export interface IDMChannel extends Document {
    messages: IMessage[];
    pinned: string[];
    users: [string, string];
}

export const dmChannelSchema = new Schema({
    messages: {
        type: [messageSchema],
        default: [],
    },
    pinned: {
        type: [ObjectId],
        default: [],
    },
    users: {
        type: [ObjectId],
        required: true,
    },
});

const dmChannels = (models["dmChannels"] as Model<IDMChannel>) || model<IDMChannel>("dmChannels", dmChannelSchema);

export default dmChannels;
