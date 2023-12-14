const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        required :true
    },
    password:{
        type: String,
        required :true
    },
    profile:{
        type:String
    }
},
{
    timestapms:true
});
userSchema.pre('save', async function(){
   const salt = await bcrypt.genSalt(10);
   this.password= await bcrypt.hashSync(this.password ,salt)
});

userSchema.methods.isPasswordMatch = async function(enterPassword){
    return await bcrypt.compareSync(enterPassword , this.password )
}



module.exports = mongoose.model("User", userSchema)