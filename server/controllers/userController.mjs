import 'dotenv/config';
import User from "../modals/User.mjs";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
//JSON web token signing and verification variables
const { sign, verify } = jwt;

//Register function
const register = async (req, res) => {
    try {
        let user = req.body.user;
        //console.log(req.body.user["password"]);
        let hashedPassword = await bcrypt.hash(req.body.user["password"], 10);
        user["password"] = hashedPassword;
        let savedUser = await User.create(user);
        res.status(201).send(savedUser);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

//Login Function
const login = async (req, res) => {
    try {
        let user = await User.findOne({ emailId: req.body.user["emailId"] });
        if (user == null) {
            res.status(404).send({ msg: "User not found." });
        } else {
            if (await bcrypt.compare(req.body.user["password"], user.password)) {
                const token = jwt.sign(user.toJSON(), process.env.SECRET);
                res.status(200).send({ token: token });
            } else {
                res.status(401).send("false");
            }
        }
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

export { register, login }