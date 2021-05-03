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

// UserSchema.method('fullName', function (this: Document<IUserDoc> ): string {
//     return this.name + " " + this.lastname
// })

export default model<IUserDoc>('users', UserSchema)