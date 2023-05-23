const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addMyLabour,allMyLabours,updatingMyLabour,deletingMyLabour,gettingMyLabour}=require("../Controllers/myLaboursReportController");
const router=express.Router();

router.route("/add_mylabour").post(isAuthenticatedUser,addMyLabour);
 router.route("/all_mylabours").get(allMyLabours);
router.route("/delete_mylabour/:id").delete(deletingMyLabour);
// router.route("/project/:id").get(gettingProject);
 router.route("/mylabour/:id").put(updatingMyLabour);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;
