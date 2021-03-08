import { ObjectId } from "mongodb";
import { Document, Model, model, models, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    appearance: {
        isLightTheme: boolean;
        fontSize: number;
        isCompactMode: boolean;
    };
    avatar: string;
    guilds: string[];
    blocked: string[];
    friends: string[];
    status: string;
}

export const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    appearance: {
        type: {
            isLightTheme: {
                type: Boolean,
                default: false,
            },
            fontSize: {
                type: Number,
                default: 16,
            },
            isCompactMode: {
                type: Boolean,
                default: false,
            },
        },
        default: {
            isLightTheme: false,
            fontSize: 16,
            isCompactMode: false,
        },
    },
    avatar: {
        type: String,
        required: true,
    },
    guilds: {
        type: [ObjectId],
        default: [],
    },
    blocked: {
        type: [ObjectId],
        default: [],
    },
    friends: {
        type: [ObjectId],
        default: [],
    },
    status: {
        type: String,
        default: "",
    },
});

const users = (models["users"] as Model<IUser>) || model<IUser>("users", userSchema);

export default users;
