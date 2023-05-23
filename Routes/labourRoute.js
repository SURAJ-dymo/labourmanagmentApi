const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addLabour,allLabours,updatingLabour,deletingLabour}=require("../Controllers/labourController");
const router=express.Router();

router.route("/add_labour").post(isAuthenticatedUser,addLabour);
 router.route("/all_labours").get(allLabours);
router.route("/delete_labour/:id").delete(deletingLabour);
// router.route("/project/:id").get(gettingProject);
 router.route("/labour/:id").put(updatingLabour);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;
