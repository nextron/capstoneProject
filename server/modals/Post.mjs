import mongoose from "mongoose";

///////Post Scehma
const postScehma = new mongoose.Schema({
    postName: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    postMetaData: {
        // Array of user Id's to keep track who liked it or disliked it.
        likes: [String],
        dislikes: [String],
        postComments: [
            { userId: String, commment: String }
        ],
    }
})

export default mongoose.model("POST", postScehma);