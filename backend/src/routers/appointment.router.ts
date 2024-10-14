import express, { Router } from 'express'
import { AppointmentController } from '../controllers/appointment.controller';

const appointmentRouter = express.Router()

appointmentRouter.route("/getAll").post(
    (req, res) => new AppointmentController().getAll(req, res)
)

appointmentRouter.route("/acceptAppointment").post(
    (req, res) => new AppointmentController().acceptAppointment(req, res)
)

appointmentRouter.route("/getAllFinishedJobs").post(
    (req, res) => new AppointmentController().getAllFinishedJobs(req, res)
)

appointmentRouter.route("/denyAppointment").post(
    (req, res) => new AppointmentController().denyAppointment(req, res)
)

appointmentRouter.route("/getAllObligations").post(
    (req, res) => new AppointmentController().getAllObligations(req, res)
)

appointmentRouter.route("/finishJob").post(
    (req, res) => new AppointmentController().finishJob(req, res)
)

appointmentRouter.route("/savePhotos").post(
    (req, res) => new AppointmentController().savePhotos(req, res)
)

appointmentRouter.route("/getObligationsDataByFirm").post(
    (req, res) => new AppointmentController().getObligationsDataByFirm(req, res)
)

appointmentRouter.route("/getFinishedJobsDataByFirm").post(
    (req, res) => new AppointmentController().getFinishedJobsDataByFirm(req, res)
)

appointmentRouter.route("/getAllAppointmentsData").post(
    (req, res) => new AppointmentController().getAllAppointmentsData(req, res)
)

appointmentRouter.route("/getAllFinishedJobsData").post(
    (req, res) => new AppointmentController().getAllFinishedJobsData(req, res)
)

appointmentRouter.route("/addAppointment").post(
    (req, res) => new AppointmentController().addAppointment(req, res)
)

appointmentRouter.route("/getAllAppointmentsOwner").post(
    (req, res) => new AppointmentController().getAllAppointmentsOwner(req, res)
)

appointmentRouter.route("/getAllFinishedJobsOwner").post(
    (req, res) => new AppointmentController().getAllFinishedJobsOwner(req, res)
)

appointmentRouter.route("/getAllObligationsOwner").post(
    (req, res) => new AppointmentController().getAllObligationsOwner(req, res)
)

appointmentRouter.route("/updateFinishedJob").post(
    (req, res) => new AppointmentController().updateFinishedJob(req, res)
)

appointmentRouter.route("/removeAppointment").post(
    (req, res) => new AppointmentController().removeAppointment(req, res)
)

export default appointmentRouter;