import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChapterSchema = new Schema({

    novelName: { type: String, index: true },
    novelSlug: { type: String, index: true, require: true },
    chaptersList: [
        {
            sourceName: { type: String },
            chapters: [
                {
                    chapterId: { type: String, index: true, require: true },
                    chapterSlug: { type: String, require: true, trim: true },
                    chapterNumber: { type: Number, require: true },
                    chapterTitle: { type: String, require: true, trim: true },
                    content: { type: String, required: true, trim: true },
                    view: { type: Number, default: 0 },
                    createdAt: { type: Date, default: Date.now },
                    updatedAt: { type: Date, default: Date.now },
                }
            ]
        }
    ]

}, {
    timestamps: true
})

export default mongoose.model("chapters", ChapterSchema);