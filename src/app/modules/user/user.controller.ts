import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // data validation using zod
  // const zodParseData = studentValidationSchema.parse(studentData);

  // will cal service func to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
