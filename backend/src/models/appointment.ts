import mongoose from 'mongoose'

const AppointmentSchema = new mongoose.Schema(
    {
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
        owner: String,
        made: Date,
        poolNumber: Number,
        fountainNumber: Number
    }, {
    versionKey: false
}
);

export default mongoose.model('AppointmentModel', AppointmentSchema, 'appointments');