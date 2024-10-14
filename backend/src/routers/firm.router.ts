import express, { Router } from 'express'
import firm from '../models/firm';
import { FirmController } from '../controllers/firm.controller';

const firmRouter = express.Router()

firmRouter.route("/getAll").post(
    (req,res)=>new FirmController().getAll(req,res)
)

firmRouter.route("/add").post(
    (req,res)=>new FirmController().add(req,res)
)

firmRouter.route("/getFirmByWorker").post(
    (req,res)=>new FirmController().getFirmByWorker(req,res)
)


export default firmRouter;