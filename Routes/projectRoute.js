const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addProject,allProjects,deletingProject,gettingProject,updatingProject}=require("../Controllers/projecController");
const router=express.Router();

router.route("/add_project").post(isAuthenticatedUser,addProject);
router.route("/all_projects").get(allProjects);
router.route("/delete_project/:id").delete(deletingProject);
router.route("/project/:id").get(gettingProject);
router.route("/project/:id").put(updatingProject);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;
