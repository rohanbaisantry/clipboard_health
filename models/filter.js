import mongoose from "mongoose";
var Schema = mongoose.Schema;

var filter = new Schema({
    name: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
});

const model = mongoose.models.filters || mongoose.model("filters", filter);
export default model;
