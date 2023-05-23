const express=require('express');

const userRoute=require('./Routes/userRoute');
const siteRoute=require('./Routes/siteRoute');
const materialRoute=require('./Routes/materialRoute');
const itemRoute=require('./Routes/itemRoute');
const projetcRoute=require('./Routes/projectRoute');
const serviceRoute=require('./Routes/serviceRoute');
const imageRoute=require('./Routes/imageRoute');
const labourRoute=require('./Routes/labourRoute');
const mylabourRoute=require('./Routes/mylabours');
const mylabourRouteToday=require('./Routes/mylaboursTodayRoute');
const rateRoute=require('./Routes/rateRoute');
const cors=require("cors");
const body_parser=require("body-parser");
const cookie_parser=require("cookie-parser");
const err=require("./Middelwares/error")

const fileUpload = require("express-fileupload");



const app=express();


app.use(express.json());
app.use(cors())
app.use(body_parser.urlencoded({extended:true}));
app.use(cookie_parser());
app.use(fileUpload());





app.use("/api/v1",userRoute)
app.use("/api/v1",siteRoute)
app.use("/api/v1",materialRoute)
app.use("/api/v1",itemRoute)
app.use("/api/v1",projetcRoute)
app.use("/api/v1",serviceRoute)
app.use("/api/v1",imageRoute)
app.use("/api/v1",labourRoute)
app.use("/api/v1",mylabourRoute)
app.use("/api/v1",mylabourRouteToday)
app.use("/api/v1",rateRoute)

app.use(err);
module.exports=app;