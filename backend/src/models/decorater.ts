import mongoose from 'mongoose'

const DecoraterSchema = new mongoose.Schema(
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
        activated: Boolean,
        blocked: Boolean,
        busyUntil: Date,
        busyFrom: Date,
        firm: String
    },{
      versionKey:false  
    }
);

export default mongoose.model('DecoraterModel', DecoraterSchema, 'decoraters');