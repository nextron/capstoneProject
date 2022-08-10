import 'dotenv/config';
import jwt from 'jsonwebtoken';
import Post from '../modals/Post.mjs';
//JSON web token signing and verification variables
const { sign, verify } = jwt;

//fetch all the posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

//Add a post
const addPost = async (req, res) => {
    try {
        const post = await Post.create(req.body["post"]);
        res.status(200).send({ msg: "Post Created" });
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

//Like a Post
//Sample Obj
// {   
//     "postId": "62f420e631db7ff63aa4cb08",
//     "userId": "62f2fdb0d1db29e996ce37bb"
// }
const likePost = async (req, res) => {
    try {
        //fetch the post 
        const post = await Post.findOne({ _id: req.body.postId });
        //checking if user has disliked the post or not
        if (post.postMetaData.dislikes.indexOf(req.body.userId) != -1) {
            post.postMetaData.dislikes = post.postMetaData.dislikes.filter((item) => {
                return item != req.body.userId;
            })
        }
        //Liking the post if not liked already
        if (post.postMetaData.likes.indexOf(req.body.userId) === -1) {
            post.postMetaData.likes.push(req.body.userId);
        }
        post.save();
        // res.status(200).send(post.postMetaData.likes);
        res.status(200).send({ msg: "Post Liked" });
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

//Dislike a Post 
const dislikePost = async (req, res) => {
    try {
        //fetch the post 
        const post = await Post.findOne({ _id: req.body.postId });
        //checking if user has liked the post or not
        if (post.postMetaData.likes.indexOf(req.body.userId) != -1) {
            post.postMetaData.likes = post.postMetaData.likes.filter((item) => {
                return item != req.body.userId;
            })
        }
        //Liking the post if not liked already
        if (post.postMetaData.dislikes.indexOf(req.body.userId) === -1) {
            post.postMetaData.dislikes.push(req.body.userId);
        }
        post.save();
        res.status(200).send({ msg: "Post Disliked" });
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

//Add a comment to Post 
const commentPost = async (req, res) => {
    try {
        //fetch the post 
        const post = await Post.findOne({ _id: req.body.postId });
        //On successfull post fetch Below code will add a comment to the post
        const commnetObj = { userId: req.body.userId, userName: req.body.userName, comment: req.body.comment };
        // { userId: String, commment: String }
        // console.log(commnetObj);
        post.postMetaData.postComments.push(commnetObj);
        post.save();
        res.status(200).send({ msg: "Comment added to the post" });
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
}

export { getAllPosts, addPost, likePost, dislikePost, commentPost }