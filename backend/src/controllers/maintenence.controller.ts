import express from 'express'
import MaintenenceM from '../models/maintenence'
import FinishedJobM from '../models/finishedJob'
import mongoose from 'mongoose'

export class MaintenenceController {

    getAll = (req: express.Request, res: express.Response) => {
        MaintenenceM.find({ firm: req.body.firm, working: false }).then(
            data => {
                res.json(data)
            }
        )
    }

    accept = (req: express.Request, res: express.Response) => {
        const jobId = new mongoose.Types.ObjectId(req.body.finishedJobId)
        MaintenenceM.updateOne({
            owner: req.body.owner,
            firm: req.body.firm,
            endDate: req.body.endDate,
            working: req.body.working,
            username: req.body.username
        }).then(
            data => {
                FinishedJobM.updateOne({ _id: jobId }, { lastMaintained: req.body.endDate }).then(
                    data => {
                        res.json(data)
                    }
                )
            }
        )
    }

    deny = (req: express.Request, res: express.Response) => {
        MaintenenceM.deleteOne(req.body).then(
            data => {
                res.json(true);
            }
        )
    }

    getDataByFirm = (req: express.Request, res: express.Response) => {
        MaintenenceM.find({ firm: req.body.firm }).then(
            data => {
                res.json(data);
            }
        )
    }

    getAllOwner = (req: express.Request, res: express.Response) => {
        MaintenenceM.find({ owner: req.body.owner }).then(
            data => {
                res.json(data);
            }
        )
    }

    addNew = (req: express.Request, res: express.Response) => {
        new MaintenenceM(req.body.maintenence).save().then(
            data => {
                res.json(data);
            }
        )
    }

}