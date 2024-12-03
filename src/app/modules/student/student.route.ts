import express from 'express';
import { studentControllers } from './student.controller';

// router function come to the express server
const router = express.Router();

// will call controller function
router.post('/create-student', studentControllers.createStudent);

// get all students data
router.get('/', studentControllers.getAllStudents);

// get single student data
router.get('/:studentId', studentControllers.getSingleStudent);

// get single student data
router.delete('/:studentId', studentControllers.deleteSingleStudent);

export const studentRoutes = router;
