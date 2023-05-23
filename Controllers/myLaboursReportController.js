const AsyncError=require("../Middelwares/AsyncError");
const myAllLabour=require("../Model/allLaboursModel");

exports.addMyLabour = AsyncError(async (req, res, next) => {
        const {lname,ltoken}=req.body;
        const savedLabour = await myAllLabour.create({
            lname,
            ltoken
            
        })
        
        res.status(200).json({
            success: true,
            mylabour: savedLabour
        })

})

exports.allMyLabours = AsyncError(async (req, res, next) => {


   const {condition,patty}=req.query;


   if(condition=="all"){
    console.log("chingam")
    console.log(patty)
    console.log(condition)
    const allMyLabours = await myAllLabour.find({}).sort({createdAt:-1});
   
    res.status(200).json({
        success: true,
        mylabours: allMyLabours,
       
    })
   

   }
    else if(condition=="token"){

        console.log(condition);
        console.log(patty);

        const allMyLabours = await myAllLabour.find({ltoken:patty});

        res.status(200).json({
            success: true,
            mylabours: allMyLabours,
           
        })

   }
   else if(condition=="lname"){
    console.log(condition);
    console.log(patty);

    const allMyLabours = await myAllLabour.find({lname:{ $regex:new RegExp('^' + patty.slice(0, 4), 'i')}}).sort({createdAt:-1});

    res.status(200).json({
        success: true,
        mylabours: allMyLabours,
       
    })



   }
   else{

 res.status(200).json({
        success: true,
        mylabours: [],
       
    })

   }

       

    
   

})

exports.deletingMyLabour = AsyncError(async (req, res, next) => {
    const { id } = req.params;

 

        const allBuildings = await myAllLabour.findOneAndDelete({ _id: id });



        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    

})


exports.gettingMyLabour = AsyncError(async (req, res, next) => {
    const { id } = req.params;
   

        const mylabour = await myAllLabour.findOne({ _id: id });



    res.status(200).json({
        success: true,
        mylabour

    })
    

  

})



exports.updatingMyLabour = AsyncError(async (req, res, next) => {



const {month}=req.query;


  
        const {lname,ltoken,lpresent,sname,lkharchi}=req.body;
    
    const pay=req.body.pay || "0";
   
    
    const updatedLabour = await myAllLabour.findByIdAndUpdate(req.params.id,{
        lpresent,
        sname,
        lkharchi,
        lpay
       
       
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


// exports.allLaboursCost = AsyncError(async (req, res, next) => {


   
//     const sname=req.query.sname || false;
   
   
   
    
//     res.status(200).json({
//         success: true,
//        total_cost:total_cost
       
//     })

// })