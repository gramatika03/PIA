import express, { Router } from 'express'
import { DecoraterController } from '../controllers/decorater.controller';

const decoraterRouter = express.Router()

decoraterRouter.route("/login").post(
    (req,res)=>new DecoraterController().login(req,res)
)

decoraterRouter.route("/getAll").post(
    (req,res)=>new DecoraterController().getAll(req,res)
)

decoraterRouter.route("/saveChanges").post(
    (req,res)=>new DecoraterController().saveChanges(req,res)
)

decoraterRouter.route("/deactivate").post(
    (req,res)=>new DecoraterController().deactivate(req,res)
)

decoraterRouter.route("/addNew").post(
    (req,res)=>new DecoraterController().addNew(req,res)
)

decoraterRouter.route("/addJob").post(
    (req,res)=>new DecoraterController().addJob(req,res)
)

decoraterRouter.route("/changePassword").post(
    (req,res)=>new DecoraterController().changePassword(req,res)
)

decoraterRouter.route("/getAllJobsData").post(
    (req,res)=>new DecoraterController().getAllJobsData(req,res)
)

decoraterRouter.route("/blockAppointment").post(
    (req,res)=>new DecoraterController().blockAppointment(req,res)
)

decoraterRouter.route("/allowAppointment").post(
    (req,res)=>new DecoraterController().allowAppointment(req,res)
)


export default decoraterRouter;