const AsyncError=require("../Middelwares/AsyncError");
const myLabour=require("../Model/mylaboursModel");
const mylaboursJanuaryToday=require("../Model/JanuaryModelToday");
const mylaboursFebruaryToday=require("../Model/FebruaryModelToday");
const mylaboursMarchToday=require("../Model/MarchModelToday");
const myLabourAprilToday=require("../Model/AprilModelToday");
const mylaboursMayToday=require("../Model/MayModelToday");
const mylaboursJuneToday=require("../Model/JuneModelToday");
const mylaboursJulyToday=require("../Model/JulyModelToday");
const mylaboursAugustToday=require("../Model/AugustModelToday");
const mylaboursSeptemberToday=require("../Model/SeptemberModelToday");
const mylaboursOctoberToday=require("../Model/OctoberModelToday");
const mylaboursNovemberToday=require("../Model/NovemberModelToday");
const mylaboursDecemberToday=require("../Model/DecemberModelToday");
const Site=require("../Model/siteModel");
const myAllLabour=require("../Model/allLaboursModel");



exports.addMyLabour = AsyncError(async (req, res, next) => {
    const {lname,ltoken,mpresent,lpresent,sname,lkharchi,lpay,present}=req.body;
    const {currentMonthss}=req.query;
    const {createdAts}=req.query;
    const {kharchiUpdate}=req.query;
    const {qrFromKhrchi}=req.query;
    const {sid}=req.query;
 const siteName=await Site.findOne({_id:sid});
 const situ=siteName.sname;
 
 const updateddd=await myAllLabour.findOneAndUpdate({ltoken:ltoken},{
    createdAt:Date.now(),
   
},{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

    
    if(currentMonthss=="January"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursJanuaryToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursJanuaryToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursJanuaryToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursJanuaryToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursJanuaryToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursJanuaryToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursJanuaryToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }


        

    }else if(currentMonthss=="February"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursFebruaryToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursFebruaryToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursFebruaryToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursFebruaryToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursFebruaryToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursFebruaryToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursFebruaryToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
    }
    else if(currentMonthss=="March"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursMarchToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursMarchToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursMarchToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursMarchToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursMarchToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursMarchToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursMarchToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
    }
    else if(currentMonthss=="April"){
        const myKharchi=lkharchi;
        const isPresent=await myLabourAprilToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await myLabourAprilToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await myLabourAprilToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await myLabourAprilToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await myLabourAprilToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await myLabourAprilToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await myLabourAprilToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
      
        

    }
    else if(currentMonthss=="May"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursMayToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursMayToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursMayToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursMayToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursMayToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursMayToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursMayToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
        

    }
    else if(currentMonthss=="June"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursJuneToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursJuneToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursJuneToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursJuneToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursJuneToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursJuneToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursJuneToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
    }
    else if(currentMonthss=="July"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursJulyToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursJulyToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursJulyToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursJulyToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursJulyToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursJulyToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursJulyToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
    }
    else if(currentMonthss=="August"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursAugustToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursAugustToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursAugustToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursAugustToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursAugustToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursAugustToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursAugustToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
    }
    else if(currentMonthss=="September"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursSeptemberToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursSeptemberToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursSeptemberToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursSeptemberToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursSeptemberToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursSeptemberToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursSeptemberToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
    }
    else if(currentMonthss=="October"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursOctoberToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursOctoberToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursOctoberToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursOctoberToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursOctoberToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursOctoberToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursOctoberToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
    }
    else if(currentMonthss=="November"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursNovemberToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursNovemberToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursNovemberToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursNovemberToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursNovemberToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursNovemberToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursNovemberToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
    }
    else if(currentMonthss=="December"){
        const myKharchi=lkharchi;
        const isPresent=await mylaboursDecemberToday.findOne({ltoken:ltoken})
        if(isPresent){
            const inArray1=isPresent.labourReport;
            const presents=inArray1.find((objj)=>{
                      return objj.createdAt==createdAts
                })
                  
    
                       if( presents){     
//........................................................................................
                                        if(kharchiUpdate && lkharchi){
                                      
                                         const {mpresent,lpresent,sname,lkharchi,lpay,createdAt}=presents;
                                         const whole={
                                         mpresent,
                                         lpresent,
                                         sname,
                                         lkharchi:myKharchi,
                                         lpay,
                                         createdAt 
                                        };

                                         const inArray=isPresent.labourReport;
                                         inArray.pop();
           
                                         inArray.push(whole);
        
                                          const updated=await mylaboursDecemberToday.findOneAndUpdate({ltoken:ltoken},{
                                          createdAt:createdAts,
                                          labourReport:inArray,
                                          present:isPresent.present,
                                        },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                        });

                                        res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })
                                   
                                                           

                                       }
                                  
                                            else{
                                            const {lkharchi,createdAt}=presents;
                                      const whole={

                                        mpresent,
                                        lpresent,
                                        sname:situ,
                                        lkharchi,
                                        lpay,
                                        createdAt:createdAt
                                                              
                                                  };
                                                
                                       const inArray=isPresent.labourReport;

                                       const newss=inArray.filter((ity)=>{
                                        return ity.createdAt !=createdAts;
                                       })
                                      
                                      
           
                                       newss.push(whole);

        
                                    const updated=await mylaboursDecemberToday.findOneAndUpdate({ltoken:ltoken},{
                                        createdAt:createdAts,
                                        present:true,
                                        labourReport:newss
                                    },{
                                        new: true,
                                        runValidators: true,
                                        useFindAndModify: false,
                                      });

                                      res.status(200).json({
                                             success: true,
                                             message:"updated successfully"
                                                               
                                                            })


                                  }
                              
   //....................................................................................              

                                       }




                     
                         else{

                                     if(qrFromKhrchi=="wage"){
                                        const whole={

                                            mpresent:"pl",
                                            lpresent:"0",
                                            sname:situ,
                                            lkharchi:0,
                                            lpay:0,
                                            createdAt:createdAts
                
                                               
                     
                                   };
                                   const inArray=isPresent.labourReport;
            
                                   inArray.push(whole);
                                   const updated=await mylaboursDecemberToday.findOneAndUpdate({ltoken:ltoken},{
                                    createdAt:createdAts,
                                    present:true,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                                    labourReport:inArray,
                                    
                                },{
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false,
                                  });
            
                                  res.status(200).json({
                                         success: true,
                                         message:"added successfully"
                                        
                                                           
                                                        })


                                     }else{
                            const whole={

                                mpresent:"pl",
                                lpresent:"0",
                                sname:situ,
                                lkharchi:0,
                                lpay:0,
                                createdAt:createdAts
    
                                   
         
                       };
                       const inArray=isPresent.labourReport;

                       inArray.push(whole);
                       const updated=await mylaboursDecemberToday.findOneAndUpdate({ltoken:ltoken},{
                        createdAt:createdAts,
                        present:false,//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
                        labourReport:inArray,
                        
                    },{
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });

                      res.status(200).json({
                             success: true,
                             message:"added successfully"
                            
                                               
                                            })


                                        }


                         }

      

        }else{

             if(qrFromKhrchi=="wage"){
                const savedLabour = await mylaboursDecemberToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:true,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })

             }
             if(qrFromKhrchi=="kharchij"){

                const savedLabour = await mylaboursDecemberToday.create({
                    lname,
                    ltoken,
                    createdAt:createdAts,
                    present:false,
                   
                    labourReport:[
                        {
                        mpresent:"p",
                        lpresent:"0",
                        sname:situ,
                        lkharchi:0,
                        lpay:0,
                        createdAt:createdAts
                    }
                    ]
                    
                })
                
                res.status(200).json({
                    success: true,
                    mylabour: savedLabour
                })


             }
            
        }
    }

    



})

exports.allMyLabours = AsyncError(async (req, res, next) => {

    const {currentMonthss}=req.query;
    const {createdAts}=req.query;
    const {kharchiUpdate}=req.query;
    const {qrFromKhrchi}=req.query;
    const {sid}=req.query;

    if(currentMonthss=="January"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursJanuaryToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursJanuaryToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursJanuaryToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }


    }else if(currentMonthss=="February"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursFebruaryToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursFebruaryToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursFebruaryToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }


    }
    else if(currentMonthss=="March"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursMarchToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursMarchToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursMarchToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }

    }
    else if(currentMonthss=="April"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await myLabourAprilToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await myLabourAprilToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await myLabourAprilToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }


    }
    else if(currentMonthss=="May"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursMayToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursMayToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursMayToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }

    }
    else if(currentMonthss=="June"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursJuneToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursJuneToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursJuneToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }

    }
    else if(currentMonthss=="July"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursJulyToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursJulyToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursJulyToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }

    }
    else if(currentMonthss=="August"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursAugustToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursAugustToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursAugustToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }

    }
    else if(currentMonthss=="September"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursSeptemberToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursSeptemberToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursSeptemberToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }

    }
    else if(currentMonthss=="October"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursOctoberToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursOctoberToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursOctoberToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }

    }
    else if(currentMonthss=="November"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursNovemberToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursNovemberToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursNovemberToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }

    }
    else if(currentMonthss=="December"){
        if(qrFromKhrchi=="wage" && sid!="undefined"){
            const siteName=await Site.findOne({_id:sid});
            const situs=siteName.sname;

            const allMyLabours = await mylaboursDecemberToday.find({createdAt:createdAts,present:true});
        
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts && mng.sname==situs
                 });
                 

                 if(lkArr.length==0){

                 }else{
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                }

            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })

          }
          if(qrFromKhrchi=="kharchij"){
            const allMyLabours = await mylaboursDecemberToday.find({createdAt:createdAts});
            const allLab=[];
  
            allMyLabours.forEach((lab)=>{
                  const newObjj={
                      lname:lab.lname,
                      ltoken:lab.ltoken,
                      labourReport:[]
                  }
  
                 const lkArr=lab.labourReport.filter((mng)=>{
                  
                        return mng.createdAt==createdAts
                 });
                 
                 newObjj.labourReport=lkArr;
                  
                 allLab.push(newObjj);
                
            })
  
  
            
          res.status(200).json({
              success: true,
              mylabours: allLab,
             
          })
          }

          if(qrFromKhrchi=="wage-All"){

            const allMyLabours = await mylaboursDecemberToday.find({createdAt:createdAts,present:true});
               
            res.status(200).json({
                success: true,
                mylabours: allMyLabours,
               
            })
          }

    }







    


})

exports.deletingMyLabour = AsyncError(async (req, res, next) => {
    const { id } = req.params;

    const {currentMonthss}=req.query;


    if(currentMonthss=="January"){
        const allBuildings = await mylaboursJanuaryToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }else if(currentMonthss=="February"){
        const allBuildings = await mylaboursFebruaryToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }
    else if(currentMonthss=="March"){
        const allBuildings = await mylaboursMarchToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }
    else if(currentMonthss=="April"){

        const allBuildings = await myLabourAprilToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    

    }
    else if(currentMonthss=="May"){
        const allBuildings = await mylaboursMayToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })

    }
    else if(currentMonthss=="June"){
        const allBuildings = await mylaboursJuneToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }
    else if(currentMonthss=="July"){
        const allBuildings = await mylaboursJulyToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }
    else if(currentMonthss=="August"){
        const allBuildings = await mylaboursAugustToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }
    else if(currentMonthss=="September"){
        const allBuildings = await mylaboursSeptemberToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }
    else if(currentMonthss=="October"){
        const allBuildings = await mylaboursOctoberToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }
    else if(currentMonthss=="November"){
        const allBuildings = await mylaboursNovemberToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }
    else if(currentMonthss=="December"){
        const allBuildings = await mylaboursDecemberToday.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            isDeleted:true
    
        })
    }



    



})

exports.gettingMyLabour = AsyncError(async (req, res, next) => {


    const { ltoken } = req.params;


    console.log(ltoken);
    const {month}=req.query;
    console.log(month);

    if(month=="January"){
        const mylabour = await mylaboursJanuaryToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }else if(month=="February"){
        const mylabour = await mylaboursFebruaryToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }
    else if(month=="March"){
        const mylabour = await mylaboursMarchToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }
    else if(month=="April"){
        const mylabour = await myLabourAprilToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

      
    
    

    }
    else if(month=="May"){
        
        const mylabour = await mylaboursMayToday.findOne({ ltoken: ltoken });
         console.log(mylabour);

       if(!mylabour){
        res.status(200).json({
            success: true,
            mylabour:{lname:"labour not found",labourReport:[]}
    
        })

       }else{
        res.status(200).json({
            success: true,
            mylabour
    
        })

       }
    

    }
    else if(month=="June"){
        const mylabour = await mylaboursJuneToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }
    else if(month=="July"){
        const mylabour = await mylaboursJulyToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }
    else if(month=="August"){
        const mylabour = await mylaboursAugustToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }
    else if(month=="September"){
        const mylabour = await mylaboursSeptemberToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }
    else if(month=="October"){
        const mylabour = await mylaboursOctoberToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }
    else if(month=="November"){
        const mylabour = await mylaboursNovemberToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }
    else if(month=="December"){
        const mylabour = await mylaboursDecemberToday.findOne({ ltoken: ltoken });
        console.log(mylabour);

      if(!mylabour){
       res.status(200).json({
           success: true,
           mylabour:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabour
   
       })

      }
   

    }

    

    



})


exports.updatingMyLabour = AsyncError(async (req, res, next) => {
const {month}=req.query;
const {createdAt}=req.query;
const {ltoken}=req.params;


    if(month=="January"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursJanuaryToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursJanuaryToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }else if(month=="February"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursFebruaryToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursFebruaryToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }
    else if(month=="March"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursMarchToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursMarchToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }
    else if(month=="April"){
        const {present}=req.body;
    
        const AllLabObj=await myLabourAprilToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await myLabourAprilToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
     
    

    }
    else if(month=="May"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursMayToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursMayToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })

    }
    else if(month=="June"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursJuneToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursJuneToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }
    else if(month=="July"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursJulyToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursJulyToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }
    else if(month=="August"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursAugustToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursAugustToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }
    else if(month=="September"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursSeptemberToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursSeptemberToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }
    else if(month=="October"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursOctoberToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursOctoberToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }
    else if(month=="November"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursNovemberToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursNovemberToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }
    else if(month=="December"){
        const {present}=req.body;
    
        const AllLabObj=await mylaboursDecemberToday.findOne({ltoken:ltoken});
        const newLats=AllLabObj.labourReport.filter((ojojjj)=>{
                   
                    return   ojojjj.createdAt!= createdAt;
                        
                     
        })
        const Exsisting=AllLabObj.labourReport.filter((ojojjj)=>{
                   
            return   ojojjj.createdAt==createdAt;         
})
   const corrected={
    mpresent:"p",
    lpresent:"0",
    sname:Exsisting[0].sname,
    lkharchi:Exsisting[0].lkharchi,
    lpay:0,
    createdAt:Exsisting[0].createdAt
   }
        newLats.push(corrected);
        const updated=await mylaboursDecemberToday.findOneAndUpdate({ltoken:ltoken},{
            present:false,
           createdAt:createdAt,
           labourReport:newLats
            
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

          res.status(200).json({
                 success: true,
                isUpdated:true
                
                                   
                                })
    }


    

})




exports.gettingMyAllLabourPagar = AsyncError(async (req, res, next) => {

    const {month}=req.query;
    

    if(month=="January"){
        const mylabours = await mylaboursJanuaryToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }else if(month=="February"){
        const mylabours = await mylaboursFebruaryToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }
    else if(month=="March"){
        const mylabours = await mylaboursMarchToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }
    else if(month=="April"){
        const mylabours = await myLabourAprilToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

        
    
    }
    else if(month=="May"){
        const mylabours = await mylaboursMayToday.find({});
         const MyAllLabourPagarDetails=[];
         mylabours.forEach((labs,i)=>{
            const singleLabour={}
            singleLabour.lname=labs.lname;
            singleLabour.ltoken=labs.ltoken;
           
                    const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                           return acc=acc+labb.lkharchi

                    },0)

            singleLabour.lkarchi=   labourKharchi    
                    const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                        return acc=acc+labb.lpay

                 },0)
            singleLabour.lpagar=labourPagar       

                 MyAllLabourPagarDetails.push(singleLabour)
                 console.log(MyAllLabourPagarDetails)
         })

       if(!mylabours){
        res.status(200).json({
            success: true,
            mylabours:{lname:"labour not found",labourReport:[]}
    
        })

       }else{
        res.status(200).json({
            success: true,
            mylabours:MyAllLabourPagarDetails
    
        })

       }

    }
    else if(month=="June"){
        const mylabours = await mylaboursJuneToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }
    else if(month=="July"){
        const mylabours = await mylaboursJulyToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }
    else if(month=="August"){
        const mylabours = await mylaboursAugustToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }
    else if(month=="September"){
        const mylabours = await mylaboursSeptemberToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }
    else if(month=="October"){
        const mylabours = await mylaboursOctoberToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }
    else if(month=="November"){
        const mylabours = await mylaboursNovemberToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }
    else if(month=="December"){
        const mylabours = await mylaboursDecemberToday.find({});
        const MyAllLabourPagarDetails=[];
        mylabours.forEach((labs,i)=>{
           const singleLabour={}
           singleLabour.lname=labs.lname;
           singleLabour.ltoken=labs.ltoken;
          
                   const labourKharchi= labs.labourReport.reduce((acc,labb,i)=>{
                          return acc=acc+labb.lkharchi

                   },0)

           singleLabour.lkarchi=   labourKharchi    
                   const labourPagar= labs.labourReport.reduce((acc,labb,i)=>{
                       return acc=acc+labb.lpay

                },0)
           singleLabour.lpagar=labourPagar       

                MyAllLabourPagarDetails.push(singleLabour)
                console.log(MyAllLabourPagarDetails)
        })

      if(!mylabours){
       res.status(200).json({
           success: true,
           mylabours:{lname:"labour not found",labourReport:[]}
   
       })

      }else{
       res.status(200).json({
           success: true,
           mylabours:MyAllLabourPagarDetails
   
       })

      }

    }

    

    



})


exports.updatingMyoldLabour = AsyncError(async (req, res, next) => {



 const {month}=req.query;
 const {lname,ltoken,lpresent:lpresentnew,sname:sid,lpay:lpayNew,createdAt}=req.body;
 const siteName=await Site.findOne({_id:sid});
 const situ=siteName.sname;
 const present=true; 
    
        if(month=="January"){
            const existingLabour=await mylaboursJanuaryToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursJanuaryToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursJanuaryToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursJanuaryToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }else if(month=="February"){
            const existingLabour=await mylaboursFebruaryToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursFebruaryToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursFebruaryToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursFebruaryToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
        else if(month=="March"){
            const existingLabour=await mylaboursMarchToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursMarchToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursMarchToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursMarchToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
        else if(month=="April"){
            const existingLabour=await myLabourAprilToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await myLabourAprilToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await myLabourAprilToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await myLabourAprilToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
        else if(month=="May"){
            const existingLabour=await mylaboursMayToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursMayToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursMayToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursMayToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
    
        }
        else if(month=="June"){
            const existingLabour=await mylaboursJuneToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursJuneToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursJuneToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursJuneToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
        else if(month=="July"){
            const existingLabour=await mylaboursJulyToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursJulyToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursJulyToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursJulyToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
        else if(month=="August"){
            const existingLabour=await mylaboursAugustToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursAugustToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursAugustToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursAugustToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
        else if(month=="September"){
            const existingLabour=await mylaboursSeptemberToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursSeptemberToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursSeptemberToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursSeptemberToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
        else if(month=="October"){
            const existingLabour=await mylaboursOctoberToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursOctoberToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursOctoberToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursOctoberToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
        else if(month=="November"){
            const existingLabour=await mylaboursNovemberToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursNovemberToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursNovemberToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursNovemberToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
        else if(month=="December"){
            const existingLabour=await mylaboursDecemberToday.findOne({ltoken:ltoken})

            if(existingLabour){
 
             const labourReportArray=existingLabour.labourReport;
 
             const isExist=labourReportArray.find((labs)=>{
              
                     return labs.createdAt==createdAt
             })
             
 
               if(isExist){
                         
               const{mpresent,lpresent,sname,lkharchi,lpay,createdAt}=isExist;
                    const newObj={
                     mpresent,
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
                    updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                 return lsbd.createdAt!=createdAt;
                    })
 
                    updatedAndRemovedOld.push(newObj);
 
 
                    const updated=await mylaboursDecemberToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:createdAt,
                    labourReport:updatedAndRemovedOld
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
 
 
               }else{
 
                    const newObj={
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt
 
                    }
 
 
                    labourReportArray.push(newObj);
                    const updated=await mylaboursDecemberToday.findOneAndUpdate({ltoken:ltoken},{
               
                     present:true,
                    createdAt:existingLabour.createdAt,
                    labourReport:labourReportArray
                     
                 },{
                     new: true,
                     runValidators: true,
                     useFindAndModify: false,
                   });
         
                   res.status(200).json({
                          success: true,
                         isUpdated:true
                         
                                            
                                         })
                 
                  
               }
 
            }else{
 
             const savedLabour = await mylaboursDecemberToday.create({
                 lname,
                 ltoken,
                 createdAt:createdAt,
                 present:false,
                
                 labourReport:[
                     {
                     mpresent:"p",
                     lpresent:lpresentnew,
                     sname:situ,
                     lkharchi:0,
                     lpay:lpayNew,
                     createdAt:createdAt
                 }
                 ]
                 
             })
             
             res.status(200).json({
                 success: true,
                 isUpdated:true
             })
 
            }
         
        }
    
    
        
    
    })
    

    exports.updatingMyoldLabourkharchi = AsyncError(async (req, res, next) => {
        const {month}=req.query;
        const {lkharchi,createdAt,lname,ltoken,sname:sid}=req.body;
        const siteName=await Site.findOne({_id:sid});
        const situ=siteName.sname;
       
            if(month=="January"){
                const existingLabour=await mylaboursJanuaryToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursJanuaryToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursJanuaryToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursJanuaryToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }else if(month=="February"){
                const existingLabour=await mylaboursFebruaryToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursFebruaryToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursFebruaryToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursFebruaryToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="March"){
                const existingLabour=await mylaboursMarchToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursMarchToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursMarchToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursMarchToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="April"){
                const existingLabour=await myLabourAprilToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await myLabourAprilToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await myLabourAprilToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await myLabourAprilToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="May"){
                const existingLabour=await mylaboursMayToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursMayToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursMayToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursMayToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="June"){
                const existingLabour=await mylaboursJuneToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursJuneToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursJuneToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursJuneToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="July"){
                const existingLabour=await mylaboursJulyToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursJulyToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursJulyToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursJulyToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="August"){
                const existingLabour=await mylaboursAugustToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursAugustToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursAugustToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursAugustToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="September"){
                const existingLabour=await mylaboursSeptemberToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursSeptemberToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursSeptemberToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursSeptemberToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="October"){
                const existingLabour=await mylaboursOctoberToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                      
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursOctoberToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursOctoberToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursOctoberToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="November"){
                const existingLabour=await mylaboursNovemberToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                     
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursNovemberToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursNovemberToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursNovemberToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
            else if(month=="December"){
                const existingLabour=await mylaboursDecemberToday.findOne({ltoken:ltoken})
    
                if(existingLabour){
     
                 const labourReportArray=existingLabour.labourReport;
     
                 const isExist=labourReportArray.find((labs)=>{
                         return labs.createdAt==createdAt
                 })
     
                   if(isExist){
                           
                   const{mpresent,lpresent,sname,lpay,createdAt}=isExist;
                        const newObj={
                         mpresent,
                         lpresent,
                         sname,
                         lkharchi:lkharchi,
                         lpay,
                         createdAt
     
                        }
     
                        updatedAndRemovedOld=labourReportArray.filter((lsbd)=>{
                                     return lsbd.createdAt!=createdAt;
                        })
     
                        updatedAndRemovedOld.push(newObj);
     
     
                        const updated=await mylaboursDecemberToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:true,
                        createdAt:existingLabour.createdAt,
                        labourReport:updatedAndRemovedOld
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
     
                   }else{
                        const newObj={
                         mpresent:"p",
                         lpresent:"0",
                         sname:situ,
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt:createdAt
     
                        }
 
                       
                        labourReportArray.push(newObj);
                        const updated=await mylaboursDecemberToday.findOneAndUpdate({ltoken:ltoken},{
                   
                         present:false,
                        createdAt:existingLabour.createdAt,
                        labourReport:labourReportArray
                         
                     },{
                         new: true,
                         runValidators: true,
                         useFindAndModify: false,
                       });
             
                       res.status(200).json({
                              success: true,
                             isUpdated:true
                             
                                                
                                             })
                       
                   }
     
                }else{
                 const savedLabour = await mylaboursDecemberToday.create({
                     lname,
                     ltoken,
                     createdAt,
                     present:false,
                    
                     labourReport:[
                         {
                         mpresent:"p",
                         lpresent:"0",
                         sname:"",
                         lkharchi:lkharchi,
                         lpay:0,
                         createdAt
                     }
                     ]
                     
                 })
                 
                 res.status(200).json({
                     success: true,
                     mylabour: savedLabour
                 })
     
                }
             
        
            }
        
        
            
        
        })


        exports.gettingMyAllLabourDayWise = AsyncError(async (req, res, next) => {

            const {month}=req.query;
            const {yourDate}=req.query;
        
            if(month=="January"){
                const mylabours = await mylaboursJanuaryToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
               
        
            }else if(month=="February"){
                const mylabours = await mylaboursFebruaryToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="March"){
                const mylabours = await mylaboursMarchToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="April"){
                const mylabours = await myLabourAprilToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="May"){
                const mylabours = await mylaboursMayToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="June"){
                const mylabours = await mylaboursJuneToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="July"){
                const mylabours = await mylaboursJulyToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="August"){
                const mylabours = await mylaboursAugustToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="September"){
                const mylabours = await mylaboursSeptemberToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="October"){
                const mylabours = await mylaboursOctoberToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="November"){
                const mylabours = await mylaboursNovemberToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
            else if(month=="December"){
                const mylabours = await mylaboursDecemberToday.find({});
                
        
                if(!mylabours){
                 res.status(200).json({
                     success: true,
                     mylabours:{lname:"labour not found",labourReport:[]}
             
                 })
         
                }else{
 
                 const MyAllLabourDayWise=[];
                   
                 mylabours.forEach((labs,i)=>{
                       
                    const singleLabour={}
                    singleLabour.lname=labs.lname;
                    singleLabour.ltoken=labs.ltoken;
                   
                            const dayDetailsFiltred= labs.labourReport.find((labObj)=>{
 
                            
                                   return labObj.createdAt==yourDate
        
                            },0)
                           
                        
                 
                    singleLabour.lkharchi=dayDetailsFiltred?dayDetailsFiltred.lkharchi:0  
                    singleLabour.lpay=dayDetailsFiltred?dayDetailsFiltred.lpay :0  
                    singleLabour.lpresent=dayDetailsFiltred?dayDetailsFiltred.lpresent:"0"   
                    singleLabour.sname=dayDetailsFiltred?dayDetailsFiltred.sname:""   
                                
                   
                    
                        
                    MyAllLabourDayWise.push(singleLabour)
                            
                         
                         
                     
        
                 })
 
 
                 res.status(200).json({
                     success: true,
                     mylabours:MyAllLabourDayWise
             
                 })
         
                }
        
            }
        
            
        })
        
        