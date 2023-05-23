const AsyncError=require("../Middelwares/AsyncError");
const Site=require("../Model/siteModel")


exports.addSite = AsyncError(async (req, res, next) => {


    const {sname,slocation,sowner}=req.body;

    
   

    const savedSite = await Site.create({
        sname:sname,
        slocation:slocation,
        sowner:sowner,
        
       
    })
    
    res.status(200).json({
        success: true,
        site: savedSite
    })



})

exports.allSites = AsyncError(async (req, res, next) => {

    const page=req.query.page || 1;
    const item_per_page=4;
    const skip=(page-1)*item_per_page;

    const NoOfSites=await Site.countDocuments();
    const NoOfPages=Math.ceil(NoOfSites/item_per_page)

    const allSites = await Site.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);
    
    
    res.status(200).json({
        success: true,
        sites: allSites,
        NoOfSites,
        NoOfPages
    
    })



})

exports.deletingSite = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const allSites = await Site.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,
        isDeleted:true

    })



})

exports.gettingSite = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const site = await Site.findOne({ _id: id });



    res.status(200).json({
        success: true,
        site

    })



})


exports.updatingSite = AsyncError(async (req, res, next) => {
    
    const {sname,slocation,sowner}=req.body;

   
   
    
    const updatedSite = await Site.findByIdAndUpdate(req.params.id,{
        sname:sname,
        slocation:slocation,
        sowner:sowner,
        
       
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
