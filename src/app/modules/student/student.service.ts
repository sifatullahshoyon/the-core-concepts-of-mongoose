import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); // built in static method

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }

  const result = await Student.create(studentData); // static method

  // const student = new Student(studentData); // create an instance

  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('User already exists!');
  // }

  // const result = await student.save(); // built in instance method provide by mongoose
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (_id: string) => {
  // const result = await Student.findOne({ _id });

  // use aggregation
  const result = await Student.aggregate([{ $match: { id: _id } }]);
  return result;
};

const deleteSingleStudentFromDB = async (_id: string) => {
  const result = await Student.updateOne({ _id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
