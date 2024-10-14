import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import ownerRouter from './routers/owner.router';
import adminRouter from './routers/admin.router';
import decoraterRouter from './routers/decorater.router';
import firmRouter from './routers/firm.router';
import appointmentRouter from './routers/appointment.router';
import maintenenceRouter from './routers/maintenence.router';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/bastaMasta')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()

router.use('/owners', ownerRouter)
router.use('/admins', adminRouter)
router.use('/decoraters', decoraterRouter)
router.use('/firms', firmRouter)
router.use('/appointments', appointmentRouter)
router.use('/maintenence', maintenenceRouter)

app.use("/" ,router)
app.listen(4000, () => console.log(`Express server running on port 4000`));