const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addMyLabour,allMyLabours,updatingMyLabour,deletingMyLabour,gettingMyLabour,gettingMyAllLabourPagar,updatingMyoldLabour,updatingMyoldLabourkharchi,gettingMyAllLabourDayWise}=require("../Controllers/myLaboursReportTodayController");
const router=express.Router();

router.route("/add_mylabourToday").post(isAuthenticatedUser,addMyLabour);
 router.route("/all_mylaboursToday").get(allMyLabours);
 router.route("/all_mylabourspagar").get(gettingMyAllLabourPagar);
 router.route("/all_mylaboursdaywise").get(gettingMyAllLabourDayWise);
router.route("/delete_mylabourToday/:id").delete(deletingMyLabour);
router.route("/mylabourToday/:ltoken").get(gettingMyLabour);
 router.route("/mylabourToday/:ltoken").put(updatingMyLabour);
 router.route("/myoldlabourToday/:ltoken").put(updatingMyoldLabour);
 router.route("/myoldlabourkharchiToday/:ltoken").put(updatingMyoldLabourkharchi);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;
