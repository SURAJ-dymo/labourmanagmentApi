const AsyncError=require("../Middelwares/AsyncError");
const Rate = require("../Model/rateModel")
exports.addRate = AsyncError(async (req, res, next) => {

    const { lrate } = req.body;

    const r = new Rate({
        lrate
    })
    const savedRate = await r.save();

    res.status(201).json({
        success: true,
        rate: savedRate
    })




})


exports.allrates = AsyncError(async (req, res, next) => {



    const rates = await Rate.find({});


    res.status(201).json({
        success: true,
        rates: rates
    })




})


exports.deletingRate = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const all = await Rate.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,

    })
})