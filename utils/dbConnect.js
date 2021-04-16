import mongoose from "mongoose";
import constants from "../constants";

async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    return mongoose.connect(constants.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
}

export default dbConnect;
