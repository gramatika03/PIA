import mongoose from 'mongoose'

const firmSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    services: String,
    prices: String,
    location: String,
    contact: String,
    startPause: Date,
    endPause: Date,
    ratings: Number,
    numberOfRates: Number
  }, {
  versionKey: false
}
);

export default mongoose.model('FirmModel', firmSchema, 'firms');