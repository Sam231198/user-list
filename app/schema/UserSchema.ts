import { Schema, model, Document } from "mongoose";

interface UsersInteraface {
    name: string,
    lastname: string,
    nickname: string,
    address: string,
    bio?: string,
    fullName(): string
}

interface IUserDoc extends UsersInteraface, Document {}

const UserSchema = new Schema({
    name: String,
    lastname: String,
    nickname: String,
    address: String,
    bio: String,
}, {
    timestamps: true
})

export default model<IUserDoc>('users', UserSchema)