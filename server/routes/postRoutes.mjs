import { Router } from 'express';
import { addPost, getAllPosts, likePost, dislikePost, commentPost } from '../controllers/postController.mjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
//JSON web token signing and verification variables
const { sign, verify } = jwt;

const router = Router();

//function to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //checking if token is null returing the control from here
    if (token == null) {
        res.status(401).send({ msg: "No Token Found" });
    }
    //checking if the token is valid
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.status(401).send({ msg: "Token is not valid." });
        }
        req.user = user;
        next();
    });
}
router.route('/').get(getAllPosts);
router.route('/addPost').post(authenticateToken, addPost);
router.route('/likePost').post(authenticateToken, likePost);
router.route('/dislikePost').post(authenticateToken, dislikePost);
router.route('/commentPost').post(authenticateToken, commentPost);

export default router;