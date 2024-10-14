import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        gender: Number,
        address: String,
        phoneNumber: String,
        email: String,
        picture: String,
        creditCardNumber: String,
        type: Number,
        activated: Boolean
    },{
      versionKey:false  
    }
);

export default mongoose.model('RequestModel', RequestSchema, 'requests');