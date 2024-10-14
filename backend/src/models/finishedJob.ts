import mongoose from 'mongoose'

const FinishedJobSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        endDate: Date,
        username: String,
        firm: String,
        owner: String,
        pictures: [],
        comment: String,
        rating: Number,
        lastMaintained: Date,
        poolNumber: Number,
        fountainNumber: Number,
        commentOwner: String
    }, {
    versionKey: false
}
);

export default mongoose.model('FinishedJobModel', FinishedJobSchema, 'finishedJobs');