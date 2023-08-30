const mongoose=require('mongoose')

const userAddressSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    postalCode:{type:String,required:true},
    fullAddress:{type:String,required:true},
    landMark:{type:String,required:true},
})
const Address= mongoose.model('Address',userAddressSchema)
module.exports = Address;