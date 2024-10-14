import express, { Router } from 'express'
import { OwnerController } from '../controllers/owner.controller';

const ownerRouter = express.Router()

ownerRouter.route("/login").post(
    (req,res)=>new OwnerController().login(req,res)
)

ownerRouter.route("/getAll").post(
    (req,res)=>new OwnerController().getAll(req,res)
)

ownerRouter.route("/saveChanges").post(
    (req,res)=>new OwnerController().saveChanges(req,res)
)

ownerRouter.route("/deactivate").post(
    (req,res)=> new OwnerController().deactivate(req,res)
)

ownerRouter.route("/getAllRequests").post(
    (req,res)=>new OwnerController().getAllRequests(req,res)
)

ownerRouter.route("/acceptRequest").post(
    (req,res)=>new OwnerController().acceptRequest(req,res)
)

ownerRouter.route("/denyRequest").post(
    (req,res)=>new OwnerController().denyRequest(req,res)
)

ownerRouter.route("/register").post(
    (req,res)=>new OwnerController().register(req,res)
)

ownerRouter.route("/changePassword").post(
    (req,res)=>new OwnerController().changePassword(req,res)
)

export default ownerRouter;