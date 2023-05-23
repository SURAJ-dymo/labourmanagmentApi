const AsyncError=require("../Middelwares/AsyncError");
const Item=require("../Model/itemModel");
const Site=require("../Model/siteModel");

exports.addItem = AsyncError(async (req, res, next) => {


    const {iname,iqty,icost,fcat,sname,istock}=req.body;

    
   

    const savedItem = await Item.create({
        iname,iqty,icost,fcat,sname,istock
         
    })
    
    res.status(200).json({
        success: true,
        item: savedItem
    })



})

exports.allItems = AsyncError(async (req, res, next) => {

    const cat=req.query.cat
    const sname=req.query.sname
    // const item_per_page=4;
    // const skip=(page-1)*item_per_page;

    // const NoOfSites=await Site.countDocuments();
    // const NoOfPages=Math.ceil(NoOfSites/item_per_page)

    // const allSites = await Material.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);
    const allItems = await Item.find({fcat:cat,sname:sname})
    const grossItem = await Item.find({sname:sname})
    const site=await Site.findOne({_id:sname});
    
    const total_project_cost= grossItem.reduce((acc,it,i)=>{
            const pays = parseInt(it.icost);

            return acc = parseInt(acc) + pays
    },[0])

   
    
    res.status(200).json({
        success: true,
        items: allItems,
         siteName:site.sname,
         total_project_cost:total_project_cost
    
    })



})

exports.deletingItem = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const allItem = await Item.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,
        isDeleted:true

    })



})

exports.gettingItem = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const item = await Item.findOne({ _id: id });



    res.status(200).json({
        success: true,
        item

    })



})


exports.updatingItem = AsyncError(async (req, res, next) => {
    
    const {iname,iqty,istock,icost}=req.body;

   
   
    
    const updatedSite = await Item.findByIdAndUpdate(req.params.id,{
        iname,iqty,istock,icost
       
       
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
