const mongoose=require("mongoose");
const shortid=require("shortid")

const shortnerSchema=new mongoose.Schema({
    Fullurl:{
        type:String,
        require:true
    },
    Shorturl:{
        type:String,
        require:true,
        default:shortid.generate
    },
    clicks:{
        type:Number,
        require:true,
        default:0
    }
})
module.exports=new mongoose.model("shortnerUrl",shortnerSchema)