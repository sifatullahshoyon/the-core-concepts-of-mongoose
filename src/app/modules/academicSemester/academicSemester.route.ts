import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlwares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

// router function come to the express server
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

// get all students data
// router.get('/', studentControllers.getAllStudents);

// get single student data
// router.get('/:studentId', studentControllers.getSingleStudent);

// get single student data
// router.delete('/:studentId', studentControllers.deleteSingleStudent);

export const AcademicSemesterRoutes = router;
