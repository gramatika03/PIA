import mongoose from 'mongoose'

const ObligationSchema = new mongoose.Schema(
    {
        username: String,
        firm: String,
        startDate: Date,
        squareFootage: Number,
        privatePublicGarden: Number,
        poolFootage: Number,
        greenFootage: Number,
        sittingFootage: Number,
        fountainFootage: Number,
        sittingNumber: Number,
        description: String,
        services: String,
        accepted: Boolean,
        endDate: Date,
        owner: String,
        made: Date,
        comment: String,
        poolNumber: Number,
        fountainNumber: Number
    }, {
    versionKey: false
}
);

export default mongoose.model('ObligationModel', ObligationSchema, 'obligations');