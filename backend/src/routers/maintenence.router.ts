import express, { Router } from 'express'
import { MaintenenceController } from '../controllers/maintenence.controller';

const maintenenceRouter = express.Router()

maintenenceRouter.route("/getAll").post(
    (req,res)=>new MaintenenceController().getAll(req,res)
)

maintenenceRouter.route("/accept").post(
    (req,res)=>new MaintenenceController().accept(req,res)
)

maintenenceRouter.route("/deny").post(
    (req,res)=>new MaintenenceController().deny(req,res)
)

maintenenceRouter.route("/getDataByFirm").post(
    (req,res)=>new MaintenenceController().getDataByFirm(req,res)
)

maintenenceRouter.route("/getAllOwner").post(
    (req,res)=>new MaintenenceController().getAllOwner(req,res)
)

maintenenceRouter.route("/addNew").post(
    (req,res)=>new MaintenenceController().addNew(req,res)
)

export default maintenenceRouter;