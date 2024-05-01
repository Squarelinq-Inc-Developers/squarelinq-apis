//
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";


//sign up
export const signUp_post = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(401).json({ message: "Invaild input in required field(s).", status: 401 });
    }
    const checkExistence = await User.findOne({ username: req.body.username });
    if (checkExistence) {
        return res.status(409).json({ message: "User already exists!", status: 409 });
    }

    try {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            username,
            email,
            password: passwordHash
        };

        const result = await User.create(newUser);
        const userWithoutPassword = await User.findById(result._id).select('-password');

        res.status(201).json({ message: "Successfully created user!", user: userWithoutPassword, status: 201 });
    } catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
};


//sign in
export const signIn_post = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({ message: "Invaild input in required field(s).", status: 401 });
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(404).json({ message: "User not found", status: 404 });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Credentials", status: 401 });
    }


    try {
        res.status(200).json({
            message: "Login successful.",
            status: 200
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
};