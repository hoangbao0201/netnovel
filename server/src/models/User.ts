import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: { type: String, index: true, unique: true, trim: true },
    username: { type: String, trim: true },
    description: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    novels: [
        { type: Schema.Types.ObjectId, ref: "novels" }
    ],
    avatar: {
        url: { type: String },
        publicdID: { type: String }
    },
    followers: [
        { type: Schema.Types.ObjectId }
    ]
    
}, {
    timestamps: true
})

export default mongoose.model("users", UserSchema);