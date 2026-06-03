const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");



// CONTROLLERS FOR THE USER WHO CAN SEND FOLLOW REQUESTS :-
// follow :-
async function followUserController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    // check1:
    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message: "You cannnot follow yourself."
        })
    }

    // check 2:
    const doesFolloweeExists = await userModel.fincOne({
        username: followeeUsername
    })
    if(!doesFolloweeExists){
        return res.status(404).json({
            message: "User you are trying to follow does not exists."
        })
    }


    // check 3:
    const existingFollowRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(existingFollowRequest){
        if(existingFollowRequest.status === "pending"){
            return res.status(200).json({
                message: "Follow request already sent"
            })
        }
        if(existingFollowRequest.status === "accepted"){
            return res.status(200).json({
                message: `You already follow ${followeeUsername}`
            })
        }
        if(existingFollowRequest.status === "rejected"){
            existingFollowRequest.status = "pending";
            await existingFollowRequest.save();

            return res.status(200).json({
                message: "Follow request sent again",
                follow: existingFollowRequest
            })
        }
    }


    // creating follow record :-
    const follow = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })

    res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow
    })
}

// unfollow:-
async function unfollowUserController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message: "You cannot unfollow yourself"
        });
    }

    const followRecord = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!followRecord){
        return res.status(200).json({
            message: "Follow record does not exist."
        })
    }


    // if exists :
    await followModel.findByIdAndDelete(followRecord._id);

    if(followRecord.status === "pending"){
        return res.status(200).json({
            message: `Follow request sent to ${followeeUsername} is cancelled`,
        })
    }

    return res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}


// CONTROLLERS FOR THE USER WHO CAN ACCEPT AND REJECT FOLLOW REQUESTS :-


module.exports = {
    followUserController,
    unfollowUserController
}