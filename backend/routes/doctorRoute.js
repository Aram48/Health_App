import express from 'express';
import {
    doctorList, loginDoctor,
    appointmentsDoctor,
    appointmentComplete,
    appointmentCancel,
    doctordashboard,
    doctorPanel,
    updateDoctorProfile
} from '../controllers/doctorControllers.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/dashboard', authDoctor, doctordashboard);
doctorRouter.get('/profile', authDoctor, doctorPanel);
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);

export default doctorRouter;