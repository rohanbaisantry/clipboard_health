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

export default mongoose.models.filters || mongoose.model("filters", filter);
