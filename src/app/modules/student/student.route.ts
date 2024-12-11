import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlwares/validateRequest';
import { updateStudentValidationSchema } from './Student.validation';

// router function come to the express server
const router = express.Router();

// will call controller function

// get all students data
router.get('/', studentControllers.getAllStudents);

// get single student data
router.get('/:studentId', studentControllers.getSingleStudent);

// updated single student data
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  studentControllers.updatedSingleStudent,
);

// get single student data
router.delete('/:studentId', studentControllers.deleteSingleStudent);

export const studentRoutes = router;
