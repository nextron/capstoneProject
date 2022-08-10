import mongoose from "mongoose";

//////////Category Scehma////////
const categoryScehma = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    }
})

export default mongoose.model("Category", categoryScehma);