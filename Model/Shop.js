

const mongoose=require('mongoose')

const shopSchema=new mongoose.Schema({
    shopimage:String,
    shopname:{type:String,required:true},
    shopDescription: String,
    shopCategory: { type: String, required: true },
    ownerName: { type: String, required: true },
    contacts: { type: String, required: true },
    address: {
        type: String,
        required: true,
      },
      location: {
        type: { type: String },
        coordinates: [Number],
      },
})
const Shop=mongoose.Model('Shop',shopSchema)
module.exports=Shop