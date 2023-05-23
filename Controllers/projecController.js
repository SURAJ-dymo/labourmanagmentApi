const AsyncError=require("../Middelwares/AsyncError");
const Project=require("../Model/projectModel")


exports.addProject = AsyncError(async (req, res, next) => {


    const {pname,pdesc,pdescD,plink}=req.body;

    const startIndex=plink.lastIndexOf("/");
   
    const len=plink.length;
   
    const myLink=plink.slice(startIndex+1,len);
   

    const savedProject = await Project.create({
        pname:pname,
        pdesc:pdesc,
        pdescD:pdescD,
        plink:myLink,
       
    })
    
    res.status(200).json({
        success: true,
        project: savedProject
    })



})

exports.allProjects = AsyncError(async (req, res, next) => {

    const page=req.query.page || 1;
    const item_per_page=parseInt(req.query.Noof) || 1;

    
    const skip=(page-1)*item_per_page;

    const NoOfProjects=await Project.countDocuments();
    const NoOfPages=Math.ceil(NoOfProjects/item_per_page)

    const allProjects = await Project.find({}).sort({createdAt:-1}).limit(item_per_page).skip(skip);
    
    
    res.status(200).json({
        success: true,
        projects: allProjects,
        NoOfProjects,
        NoOfPages
    
    })



})

exports.deletingProject = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const allBuildings = await Project.findOneAndDelete({ _id: id });



    res.status(200).json({
        success: true,
        isDeleted:true

    })



})

exports.gettingProject = AsyncError(async (req, res, next) => {
    const { id } = req.params;
    

    const project = await Project.findOne({ _id: id });



    res.status(200).json({
        success: true,
        project

    })



})


exports.updatingProject = AsyncError(async (req, res, next) => {
    
    const {pname,pdesc,pdescD,plink}=req.body;

    const startIndex=plink.lastIndexOf("/");
   
    const len=plink.length;
   
    const myLink=plink.slice(startIndex+1,len);
   
    
    const updatedProject = await Project.findByIdAndUpdate(req.params.id,{
        pname:pname,
        pdesc:pdesc,
        pdescD:pdescD,
        plink:myLink,
       
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
