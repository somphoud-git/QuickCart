import { Minimize, Type } from "lucide-react";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    _id:{Type:String, require:true},
    name:{Type:String, require:true},
    email:{Type:String, require:true, unique:true},
    imageUrl:{Type:String, require:true},
    cartItem:{Type:Object,default : {}}}, {minimize:false})

const User = mongoose.models.user || mongoose.model('user',userSchema)

export default User
