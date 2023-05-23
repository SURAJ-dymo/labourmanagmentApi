const AsyncError = require("../Middelwares/AsyncError");
const Image = require("../Model/imageModel");
const cloudinary = require("cloudinary");


exports.addImage = AsyncError(async (req, res, next) => {
  const { iname } = req.body;

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "buildingimages",
     
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }


  req.body.images = imagesLinks;
  req.body.iname = req.iname;

  const image = await Image.create({
    iname: iname,
    images: imagesLinks
  })



  res.status(200).json({
    success: true,
    image: image
  })



})


exports.allImages = AsyncError(async (req, res, next) => {

  const page = req.query.page || 1;
  const item_per_page = 4;
  const skip = (page - 1) * item_per_page;

  const NoOfImages = await Image.countDocuments();
  const NoOfPages = Math.ceil(NoOfImages / item_per_page)

  const allImages = await Image.find({}).sort({ createdAt: -1 }).limit(item_per_page).skip(skip);


  res.status(200).json({
    success: true,
    images: allImages,
    NoOfImages,
    NoOfPages

  })



})

exports.deletingImage = AsyncError(async (req, res, next) => {


  const image = await Image.findById(req.params.id);
  // Deleting Images From Cloudinary
  for (let i = 0; i < image.images.length; i++) {
    await cloudinary.v2.uploader.destroy(image.images[i].public_id);
  }

  await image.remove();


  res.status(200).json({
    success: true,
    isDeleted: true

  })



})

exports.gettingImage = AsyncError(async (req, res, next) => {
  const { id } = req.params;
  

  const image = await Image.findOne({ _id: id });



  res.status(200).json({
      success: true,
      image

  })



})

exports.updatingImage = AsyncError(async (req, res, next) => {
    
  const {iname}=req.body;

  
 
  
  const updatedImage = await Image.findByIdAndUpdate(req.params.id,{
      iname:iname,
       
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




