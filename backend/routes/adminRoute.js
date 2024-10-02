import express from 'express';
import { addDoctor, allDoctors, loginAdmin } from '../controllers/adminContoller.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorControllers.js';

const adminRoter = express.Router();
adminRoter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRoter.post('/login', loginAdmin);
adminRoter.post('/all-doctors', authAdmin, allDoctors);
adminRoter.post('/change-availability', authAdmin, changeAvailability);


export default adminRoter;