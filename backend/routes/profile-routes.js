const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedUser} = require("../middlewares/route-authorization");


// import controllers
const {
    getUserDetails,
    updateUserDetails,
    deleteUser,
    getallposts,
    createPost,
    updatepost,
    deletePost,
    getProfileData,
   
} = require("../controllers/profile-controller");

// use routes
router.route("/profile").get(protectedUser, getProfileData);

router.route("/getprofile").get(protectedUser,getUserDetails);
router.route("/updateprofile/:id").put(protectedUser,updateUserDetails);
router.route("/deleteprofile/:id").delete(protectedUser,deleteUser);

router.route("/getpost").get(protectedUser,getallposts);
router.route("/createpost").post(protectedUser,createPost);
router.route("/updatepost/:id").put(protectedUser,updatepost);
router.route("/deletepost/:id").delete(protectedUser,deletePost);



module.exports = router;
