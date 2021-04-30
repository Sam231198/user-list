import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    id: String,
    name: String,
    lastname: String,
    nickname: String,
    address: String,
    bio: String
}, {
    timestamps: true
})

export default model('User', UserSchema)