import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: { type: String, index: true, unique: true, trim: true },
    username: { type: String, trim: true },
    description: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },

})

export default mongoose.model("User", UserSchema);