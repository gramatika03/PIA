import express from 'express'
import AppointmentM from '../models/appointment'
import ObligationM from '../models/obligation'
import FinishedJobM from '../models/finishedJob'
import firm from '../models/firm'
import DecoraterM from '../models/decorater'
import mongoose from 'mongoose'
import FirmM from '../models/firm'

export class AppointmentController {

    getAll = (req: express.Request, res: express.Response) => {
        AppointmentM.find({ firm: req.body.firm }).then(
            data => {
                res.json(data)
            }
        )
    }

    getAllAppointmentsData = (req: express.Request, res: express.Response) => {
        AppointmentM.find().then(
            data => {
                res.json(data)
            }
        )
    }

    getAllFinishedJobsData = (req: express.Request, res: express.Response) => {
        FinishedJobM.find().then(
            data => {
                res.json(data)
            }
        )
    }

    getAllObligations = (req: express.Request, res: express.Response) => {
        ObligationM.find({ username: req.body.username }).then(
            data => {
                res.json(data)
            }
        )
    }

    getAllFinishedJobs = (req: express.Request, res: express.Response) => {
        FinishedJobM.find({ username: req.body.username }).then(
            data => {
                res.json(data)
            }
        )
    }

    acceptAppointment = (req: express.Request, res: express.Response) => {
        const dataOb = {
            username: req.body.username,
            firm: req.body.appointment.firm,
            startDate: req.body.appointment.startDate,
            squareFootage: req.body.appointment.squareFootage,
            privatePublicGarden: req.body.appointment.privatePublicGarden,
            poolFootage: req.body.appointment.poolFootage,
            greenFootage: req.body.appointment.greenFootage,
            sittingFootage: req.body.appointment.sittingFootage,
            fountainFootage: req.body.appointment.fountainFootage,
            sittingNumber: req.body.appointment.sittingNumber,
            description: req.body.appointment.description,
            services: req.body.appointment.services,
            accepted: req.body.appointment.accepted,
            endDate: req.body.endDate,
            owner: req.body.appointment.owner,
            made: req.body.appointment.made,
            comment: req.body.comment,
            poolNumber: req.body.appointment.poolNumber,
            fountainNumber: req.body.appointment.fountainNumber
        }

        AppointmentM.deleteOne(req.body.appointment).then(
            data => {
                new ObligationM(dataOb).save().then(
                    data => {
                        DecoraterM.updateOne({ username: req.body.username }, { busyFrom: req.body.appointment.startDate, busyUntil: req.body.endDate }).then(
                            data => {
                                res.json(data)
                            }
                        )
                    }
                )

            }
        )
    }

    denyAppointment = (req: express.Request, res: express.Response) => {
        AppointmentM.deleteOne(req.body.appointemnt).then(
            data => {
                res.json(true)
            }
        )
    }

    finishJob = (req: express.Request, res: express.Response) => {
        const dataJob = {
            _id: new mongoose.Types.ObjectId(),
            endDate: req.body.endDate,
            username: req.body.username,
            firm: req.body.firm,
            pictures: [],
            owner: req.body.owner,
            comment: req.body.comment,
            rating: -1,
            poolNumber: req.body.poolNumber,
            fountainNumber: req.body.fountainNumber,
            lastMaintained: req.body.endDate,
            commentOwner: ""
        }
        ObligationM.deleteOne(req.body.obligation).then(
            data => {
                new FinishedJobM(dataJob).save().then(
                    data => {
                        if (data) {
                            DecoraterM.updateOne({ username: req.body.username }, { busyFrom: new Date(1, 0, 1), busyUntil: new Date(1, 0, 1) }).then(
                                data => res.json(data)
                            )
                        } else {
                            res.json(false)
                        }
                    }
                )
            }
        )
    }

    savePhotos = (req: express.Request, res: express.Response) => {
        FinishedJobM.updateOne({
            username: req.body.username,
            endDate: req.body.endDate,
            firm: req.body.firm,
            owner: req.body.owner
        }, req.body).then(
            data => {
                if (data) res.json(true)
                else res.json(false)
            }
        )
    }

    getObligationsDataByFirm = (req: express.Request, res: express.Response) => {
        ObligationM.find({ firm: req.body.firm }).then(
            data => {
                res.json(data)
            }
        )
    }

    getFinishedJobsDataByFirm = (req: express.Request, res: express.Response) => {
        FinishedJobM.find({ firm: req.body.firm }).then(
            data => {
                res.json(data)
            }
        )
    }

    addAppointment = (req: express.Request, res: express.Response) => {
        new AppointmentM(req.body.appointemnt).save().then(
            data => {
                if (data) res.json(true)
                else res.json(false)
            }
        )
    }

    getAllAppointmentsOwner = (req: express.Request, res: express.Response) => {
        AppointmentM.find({ owner: req.body.username }).then(
            data => {
                res.json(data)
            }
        )
    }

    getAllFinishedJobsOwner = (req: express.Request, res: express.Response) => {
        FinishedJobM.find({ owner: req.body.username }).then(
            data => {
                res.json(data)
            }
        )
    }

    getAllObligationsOwner = (req: express.Request, res: express.Response) => {
        ObligationM.find({ owner: req.body.username }).then(
            data => {
                res.json(data)
            }
        )
    }

    updateFinishedJob = (req: express.Request, res: express.Response) => {
        FinishedJobM.updateOne({
            endDate: req.body.finishedJob.endDate,
            username: req.body.finishedJob.username,
            firm: req.body.finishedJob.firm,
            owner: req.body.finishedJob.owner,
            pictures: req.body.finishedJob.pictures,
            comment: req.body.finishedJob.comment,
            poolNumber: req.body.finishedJob.poolNumber,
            fountainNumber: req.body.finishedJob.fountainNumber
        }, {
            commentOwner: req.body.finishedJob.commentOwner,
            rating: req.body.finishedJob.rating,
            lastMaintained: req.body.finishedJob.lastMaintained
        }).then(
            data => {
                if (data) {
                    FirmM.findOne({name: req.body.finishedJob.firm}).then(
                        data => {
                            if(!data || data.numberOfRates == null) {
                                res.json(false);
                                return;
                            }
                            FirmM.updateOne({name: data.name}, {ratings: data.ratings + req.body.finishedJob.rating, numberOfRates: data.numberOfRates + 1}).then(
                                data => {
                                    res.json(data)
                                }
                            )
                        }
                    )
                } else {
                    res.json(data)
                }
            }
        )
    }

    removeAppointment = (req: express.Request, res: express.Response) => {
        AppointmentM.deleteOne(req.body.appointment).then(
            data => {
                res.json(data)
            }
        )
    }

}