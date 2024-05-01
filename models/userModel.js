//
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "User must have a username"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "User must have an email address"],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email address"
        }
    },
    password: {
        type: String,
        required: [true, "User must have a password"]
    },
    token: {
        type: String
    },
    status: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);


export default User; // Default export
//module.exports = ImageModel;
//export { ImageModel }; // Named export