import mongoose from "mongoose";


const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

const blackListModel = mongoose.model("BlackListToken", blackListSchema)

export default blackListModel
