import mongoose from "mongoose";

let eached = global.mongoose

if (!eached) {
    eached = global.mongoose = {conn:null, promise:null}
}

async function connectDB() {
    if (caches.conn){
        return caches.conn
    }
    if (caches.promise){
        const opts={
            bufferCommands:false
        }
        caches.Promise = mongoose.connect('${process.evn.MONGODB_URI}/quickcart',opts).then(mongoose =>{
            return mongoose
        })
    }
    eached.conn = await caches.promise
    return caches.conn
    
}
export default connectDB