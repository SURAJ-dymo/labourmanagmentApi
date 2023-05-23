const express=require('express');
const {isAuthenticatedUser} =require("../Middelwares/auth");
const {addItem,allItems,deletingItem,gettingItem,updatingItem}=require("../Controllers/itemController");
const router=express.Router();

router.route("/add_item").post(isAuthenticatedUser,addItem);
router.route("/all_items").get(allItems);
router.route("/delete_item/:id").delete(deletingItem);
router.route("/item/:id").get(gettingItem);
router.route("/item/:id").put(updatingItem);
// router.route("/login").post(loginUser);
// router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;
