import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student Retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student Retrieved successfully',
    data: result,
  });
});

const updatedSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentServices.updatedSingleStudentIntoDB(
    studentId,
    student,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  updatedSingleStudent,
  deleteSingleStudent,
};
