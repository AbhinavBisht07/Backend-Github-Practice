const postModel = require("../models/post.model");
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


// create post:-
async function createPostController(req, res) {
    // console.log(req.body, req.file);
    const userId = req.user.id;

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'test_image',
        folder: 'practice-insta-clone/posts'
    });
    // res.send(file);

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: userId
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}


// Get posts :-
async function getPostsController(req,res) {
    const userId = req.user.id;

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}


// Get specific post:-
async function getPostDetailController(req,res) {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }


    const isUserValid = post.user.toString() === userId;

    if(!isUserValid){
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully",
        post
    })
}


module.exports = {
    createPostController,
    getPostsController,
    getPostDetailController
}