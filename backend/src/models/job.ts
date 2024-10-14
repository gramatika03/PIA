import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
    {
        username: String,
        firmName: String    
    },{
      versionKey:false  
    }
);

export default mongoose.model('JobModel', JobSchema, 'jobs');