import { Tstudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: Tstudent) => {
  // const result = await StudentModel.create(student); // built in static method

  // instance
  const student = new StudentModel(studentData);
  const result = await student.save(); // built in instance method provide by mongoose
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (_id: string) => {
  const result = await StudentModel.findOne({ _id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
