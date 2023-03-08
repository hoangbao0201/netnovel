import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NovelsSchema = new Schema({

    slug:           { type: String, require: true, index: true },
    title:          { type: String, trim: true },
    thumbnail: {
        url:        { type: String },
        publicId:  { type: String }
    },
    description:    { type: String, trim: true },

    author:         { type: String, require: true },

    category:       { type: String, require: true, trim: true },
    personality:    { type: String, require: true, trim: true },
    scene:          { type: String, require: true, trim: true },
    classify:       { type: String, require: true, trim: true },
    viewFrame:      { type: String, require: true, trim: true },

    // Connect
    chapters:       { type: Schema.Types.ObjectId, ref: 'chapters' },
    postedBy:         { type: Schema.Types.ObjectId, ref: 'users' }

}, {
    timestamps: true
})

export default mongoose.model("novels", NovelsSchema);
