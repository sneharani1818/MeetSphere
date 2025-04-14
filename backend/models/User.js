import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default model("Users", userSchema);
