import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChapterSchema = new Schema({

    novelName: { type: String, index: true },
    novelSlug: { type: String, index: true, require: true },
    chapterCount: { type: Number, default: 0 },

    chaptersList: [
        {
            sourceName: { type: String },
            chapterNumber: { type: Number, require: true },
            title: { type: String, require: true, trim: true },
            content: { type: String, required: true, trim: true },
            view: { type: Number, default: 0 },
            
            createAt: { type: Date, default: Date.now },
            updateAt: { type: Date, default: Date.now },
        }
    ]
},
    {
        timestamps: true,
    }
);

export default mongoose.model("chapters", ChapterSchema);
