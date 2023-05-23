const AsyncError=require("../Middelwares/AsyncError");
const Material=require("../Model/materialModel")


exports.addMaterial = AsyncError(async (req, res, next) => {


    const {mname}=req.body;

    
   

    const savedMaterial = await Material.create({
        mname:mname,
       
        
       
    })
    
    res.status(200).json({
        success: true,
        material: savedMaterial
    })



})

exports.allMaterials = AsyncError(async (req, res, next) => {

     const siteId=req.query.siteId ;
    // const item_per_page=4;
    // const skip=(page-1)*item_per_page;

    // const NoOfSites=await Site.countDocuments();
    // const NoOfPages=Math.ceil(NoOfSites/item_per_page)

    // const allSites = await Material.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);
    const allMaterials = await Material.find({})
    
    
    res.status(200).json({
        success: true,
        materials: allMaterials,
        siteId:siteId
       
    
    })



})

exports.deletingMaterial = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const allSites = await Material.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,
        isDeleted:true

    })



})

exports.gettingMaterial = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const material = await Material.findOne({ _id: id });



    res.status(200).json({
        success: true,
        material

    })



})


exports.updatingMaterial = AsyncError(async (req, res, next) => {
    
    const {mname}=req.body;

   
   
    
    const updatedSite = await Material.findByIdAndUpdate(req.params.id,{
        mname:mname,
       
       
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
