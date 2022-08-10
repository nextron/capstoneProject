import mongoose from "mongoose";

////////////User Schema////////////////
const userScehma = new mongoose.Schema({
    fName: {
        type: String,
        minlength: 3,
        maxlength: 15,
        required: true
    },
    lName: {
        type: String,
        minlength: 3,
        maxlength: 15
    },
    emailId: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    contactNumber: {
        type: Number,
        minlength: 6,
        maxlength: 20
    },
    sex: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default:'Other'
    }
})

export default  mongoose.model("User", userScehma);