const express=require("express");
const mongoose=require("mongoose")
const shortnerUrl=require("./models/model")
mongoose.connect("mongodb://localhost/URLShortner",{useUnifiedTopology:true,useNewUrlParser:true})
mongoose.set('strictQuery', true);
const app=express();
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.get("/",async (req,res)=>{
    const shorturl=await shortnerUrl.find();
    res.render("index",{shorturl:shorturl})
})
app.post("/shortnerUrl",async (req,res)=>{
    await shortnerUrl.create({Fullurl:req.body.URL})
    res.redirect("/")
})
app.get("/:short", async (req,res)=>{
    const shorturl1=await shortnerUrl.findOne({Shorturl:req.params.short})
    if(shorturl1==null)
    {
        return res.sendStatus(404);
    }
    shorturl1.clicks++;
    shorturl1.save();
    res.redirect(shorturl1.Fullurl);
})
app.listen(process.env.PORT || 5000,()=>{
    console.log("server started on port 5000");
})