const Service=require("../Model/serviceModel");
const AsyncError=require("../Middelwares/AsyncError");


exports.addService = AsyncError(async (req, res, next) => {

    const {sname,sdesc,sdescD}=req.body;
    const savedService = await Service.create({
        sname:sname,
        sdesc:sdesc,
        sdescD:sdescD,
    })
    
    res.status(200).json({
        success: true,
        service: savedService
    })
})

exports.allServices = AsyncError(async (req, res, next) => {

    const page=req.query.page || 1;
    const item_per_page=parseInt(req.query.numberof);

    
    const skip=(page-1)*item_per_page;

    const NoOfServices=await Service.countDocuments();
    const NoOfPages=Math.ceil(NoOfServices/item_per_page)

    const allServices = await Service.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);
    
    


    

    res.status(200).json({
        success: true,
        services: allServices,
        NoOfServices,
        NoOfPages
    
    })



})

exports.deletingService = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const allServices = await Service.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,
        isDeleted:true

    })
})

exports.gettingService = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const service = await Service.findOne({ _id: id });



    res.status(200).json({
        success: true,
        service

    })
})


exports.updatingService = AsyncError(async (req, res, next) => {
    
    const {sname,sdesc,sdescD}=req.body;

   
   
    
    const updatedService = await Service.findByIdAndUpdate(req.params.id,{
        sname:sname,
        sdesc:sdesc,
        sdescD:sdescD,
       
       
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });


    res.status(200).json({
        success: true,
        isUpdated:true,
       
    })

})
