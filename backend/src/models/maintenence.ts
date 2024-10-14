import mongoose from 'mongoose'

const MaintenenceSchema = new mongoose.Schema(
    {
        owner: String,
        firm: String,
        endDate: Date,
        working: Boolean,
        finishedJobId: String,
        username: String
    },{
      versionKey:false  
    }
);

export default mongoose.model('MaintenenceModel', MaintenenceSchema, 'maintenences');