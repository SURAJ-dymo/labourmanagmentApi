const AsyncError=require("../Middelwares/AsyncError");
const Labour=require("../Model/labourModel")
const Site=require("../Model/siteModel");

exports.addLabour = AsyncError(async (req, res, next) => {


    const {lname,sname,createdAt}=req.body;

    
        
    
   

    const savedLabour = await Labour.create({
        lname,
        sname,
        createdAt,
     
    })
    
    res.status(200).json({
        success: true,
        labour: savedLabour
    })



})

exports.allLabours = AsyncError(async (req, res, next) => {




    const myDate=req.query.myDate || false;
    const sname=req.query.sname || false;
    const page=req.query.page || 1;
    const item_per_page=10;
    const skip=(page-1)*item_per_page;

    const NoOfLabours=await Labour.countDocuments();
    const NoOfPages=Math.ceil(NoOfLabours/item_per_page)
    
     
    const allLabours = await Labour.find({createdAt:myDate,sname:sname}).sort({createdAt:-1});
   

    const allLabourscost = await Labour.find({sname:sname})
          
    const total_cost=allLabourscost.reduce((acc,la,i)=>{
            return acc=parseInt(acc)+parseInt(la.pay);
    },[0])
     
    const site=await Site.findOne({_id:sname});
    
    res.status(200).json({
        success: true,
        labours: allLabours,
        NoOfLabours,
        NoOfPages,
        allcost:total_cost,
        siteName:site.sname
    
    })



})

exports.deletingLabour = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const allBuildings = await Labour.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,
        isDeleted:true

    })



})

exports.gettingLabour = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const labour = await Labour.findOne({ _id: id });



    res.status(200).json({
        success: true,
        labour

    })



})


exports.updatingLabour = AsyncError(async (req, res, next) => {
    
    const {present,paidStatus}=req.body;
    const pay=req.body.pay || "0";
   
    
    const updatedLabour = await Labour.findByIdAndUpdate(req.params.id,{
        present,
        paidStatus,
        pay
       
       
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


exports.allLaboursCost = AsyncError(async (req, res, next) => {


   
    const sname=req.query.sname || false;
   
   
   
    
    res.status(200).json({
        success: true,
       total_cost:total_cost
       
    })

})