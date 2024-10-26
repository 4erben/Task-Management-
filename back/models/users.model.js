const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    tasks:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tasks"
    }
],
});

userSchema.statics.signup = async function(name,email,password){
    if(!name || !email || !password){
        throw Error("All field must be filled!")
    }
    /* if(!validator.isStrongPassword(password)){
        throw Error("Enter A strong Password!");
    } */
    const exist = await this.findOne({email});
    if(exist){
        throw Error("This email has already been taken!")
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({
        name:name,
        email:email,
        password: hash
    })
    return user;
}


userSchema.statics.login = async function(email,password){
        if(!email || !password){
            throw new Error("All fields must be filled!");
        };
        const user = await this.findOne({email});
        if(!user){
            throw new Error("Invalid email or password"); // this error message for security measures
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            throw new Error("Invalid email or password"); // this error message is for security measures too
        }
        return user;
}
module.exports = mongoose.model("User",userSchema);