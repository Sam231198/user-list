import { Schema, model, Document } from "mongoose";
import UserInterface from "../types/UserInterface"

interface UsersModelInteraface extends UserInterface, Document {
    fullName(): any
}

const UserSchema = new Schema({
    name: String,
    lastname: String,
    nickname: String,
    address: String,
    bio: String
}, {
    timestamps: true
})

UserSchema.methods.fullName = function (this: UsersModelInteraface): any {
    return this.name + ' ' + this.lastname
}

export default model<UsersModelInteraface>('users', UserSchema)