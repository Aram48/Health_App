import express from 'express';
import { addDoctor, allDoctors, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/adminContoller.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorControllers.js';

const adminRoter = express.Router();
adminRoter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRoter.post('/login', loginAdmin);
adminRoter.post('/all-doctors', authAdmin, allDoctors);
adminRoter.post('/change-availability', authAdmin, changeAvailability);
adminRoter.get('/appointments', authAdmin, appointmentsAdmin);
adminRoter.post('/cancel-appointment', authAdmin, appointmentCancel);
adminRoter.get('/dashboard', authAdmin, adminDashboard);


export default adminRoter;