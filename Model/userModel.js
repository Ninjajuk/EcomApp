const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    Name: {type:String,required: [true, 'Name required']},
    Email:{type:String,required:true,unique: true},
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },
    Password:{type:String,required:true}
})

const User=mongoose.model('User',userSchema)

module.exports=User  