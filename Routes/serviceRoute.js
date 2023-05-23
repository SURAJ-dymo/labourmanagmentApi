const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addService,allServices,deletingService,gettingService,updatingService}=require("../Controllers/serviceController")
const router=express.Router();

router.route("/add_service").post(addService);
 router.route("/all_services").get(allServices);
 router.route("/delete_service/:id").delete(deletingService);
 router.route("/service/:id").get(gettingService);
 router.route("/service/:id").put(updatingService);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;
