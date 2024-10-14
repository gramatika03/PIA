import express from 'express'
import FirmM from '../models/firm'
import JobM from '../models/job'

export class FirmController{

    getAll = (req: express.Request, res: express.Response) => {
        FirmM.find().then(
            data => {
                res.json(data)
            }
        )
    }

    add = (req: express.Request, res: express.Response) => {
        new FirmM(req.body).save().then(
            data => {
                if(data) res.json(true)
                else res.json(false)
            }
        )
    }

    getFirmByWorker = (req: express.Request, res: express.Response) => {
        JobM.findOne({username: req.body.username}).then(
            data => {
                if(data) {
                    FirmM.findOne({name: data.firmName}).then(
                        firmData => {
                            res.json(firmData)
                        }
                    )
                } else {
                    res.json(null)
                }
            }
        )
    }
}