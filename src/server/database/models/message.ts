import { ObjectId } from "mongodb";
import { Document, model, Model, models, Schema } from "mongoose";

export interface IMessage extends Document {
    channel: string;
    content: string;
    author: string;
}

export const messageSchema = new Schema({
    channel: {
        type: ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        required: true,
    },
});

const messages = (models["messages"] as Model<IMessage>) || model<IMessage>("messages", messageSchema);

export default messages;
