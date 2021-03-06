import { ObjectId } from "mongodb";
import { Document, model, Model, models, Schema } from "mongoose";
import { channelSchema, IChannel } from "./channel";
import { IRole, roleSchema } from "./role";

export interface IGuild extends Document {
    owner: string;
    channels: IChannel[];
    roles: IRole[];
    members: string[];
    name: string;
    icon: string;
}

export const guildSchema = new Schema({
    owner: {
        type: ObjectId,
        required: true,
    },
    channels: {
        type: [channelSchema],
        default: [],
    },
    roles: {
        type: [roleSchema],
        default: [],
    },
    members: {
        type: [ObjectId],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
});

const guilds = (models["guilds"] as Model<IGuild>) || model<IGuild>("guilds", guildSchema);

export default guilds;
