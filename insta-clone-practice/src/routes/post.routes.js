const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");

const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});


/**
 * @route POST /api/posts/   [protected]
 * @description Create a post with the content provided in the request body( req.body = { caption, image-file } ). The post should be associated with the user, from whom the request came 
 * @access Private
 */
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController);


/**
 * @route GET /api/posts/  [protected]
 * @description Get all posts created by a user from whom the request came from .. Also return the total number of posts created by the user 
 * @access Private
 */
postRouter.get("/", identifyUser, postController.getPostsController);


/**
 * @route GET /api/posts/details/:postId
 * @description Return details about a specific post, through the posid request by user. Also check whether the posts belongs to the user that is requesting or from whom the request came ..
 * @access Private
 */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailController);


module.exports = postRouter;