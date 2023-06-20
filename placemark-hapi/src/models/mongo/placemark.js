import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
    name: String,
    description: String,
    location: {
        lat: Number,
        lng: Number
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: String,
    img: [String]
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);