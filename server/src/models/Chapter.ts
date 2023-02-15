import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
    novelName: { type: String, index: true },
    novelSlug: { type: String, index: true, require: true },

    sourceName: { type: String },
    title: { type: String, require: true, trim: true },
    chapterNumber: { type: Number, require: true },
    content: { type: String, required: true, trim: true },
    
    view: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    {
        timestamps: true,
    }
);

export default mongoose.model("chapters", ChapterSchema);
