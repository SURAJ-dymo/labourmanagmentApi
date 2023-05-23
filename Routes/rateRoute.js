const express=require("express");
const { addRate,allrates,deletingRate } = require("../Controllers/rateController");

const router=express.Router();
router.route('/add_rate').post(addRate);
router.route('/all_rates').get(allrates);
router.route('/delete_rate/:id').delete(deletingRate);

module.exports=router;