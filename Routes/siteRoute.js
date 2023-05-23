const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addSite,allSites,deletingSite,gettingSite,updatingSite}=require("../Controllers/siteController");
const router=express.Router();

router.route("/add_site").post(isAuthenticatedUser,addSite);
router.route("/all_sites").get(allSites);
router.route("/delete_site/:id").delete(deletingSite);
router.route("/site/:id").get(gettingSite);
router.route("/site/:id").put(updatingSite);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;
