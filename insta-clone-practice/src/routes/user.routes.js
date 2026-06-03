const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();





// APIs for the user sending follow requests or trying to unfollow another user :-
/**
 * @route POST /api/users/follow/:username
 * @description Send a follow request to a user
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

/**
 * @route DELETE /api/users/unfollow:username
 * @description Unfollow a user
 */
userRouter.delete("/unfollow/:username", identifyUser, userController.unfollowUserController)





// APIs for the user who is accepting/rejecting follow requests :-



module.exports = userRouter;