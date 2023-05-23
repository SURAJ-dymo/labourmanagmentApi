const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addMaterial,allMaterials,deletingMaterial,gettingMaterial,updatingMaterial}=require("../Controllers/materialController");
const router=express.Router();

router.route("/add_material").post(isAuthenticatedUser,addMaterial);
router.route("/all_materials").get(allMaterials);
router.route("/delete_material/:id").delete(deletingMaterial);
router.route("/material/:id").get(gettingMaterial);
router.route("/material/:id").put(updatingMaterial);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;
