import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

// 2. Create a Schema corresponding to the document interface.

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required.'],
    trim: true, // remove whitespace after & before words
    maxLength: [20, 'First Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required.'],
    trim: true,
    maxLength: [20, 'Last Name can not be more than 20 characters'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required."],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's Occupation is required."],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact Number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's Name is required."],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's Occupation is required."],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's Contact Number is required."],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local Guardian's Name is required."],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Local Guardian's Occupation is required."],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian's Contact Number is required."],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local Guardian's Address is required."],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    // interface এর ক্ষেত্রে type গুলো থাকে small letter আর mongoose এর ক্ষেত্রে type গুলো থাকে Capitalize
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Student ID is required.'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student Name is required.'],
    },

    // typescript এ যেইটা union type mongoose এ সেইটা enum type
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          '{VALUE} is not a valid gender. Allowed values: male, female, other.', // mongoose এ {VALUE} লিখলে সে ঐ property এর value গুলোকে দিয়ে দেয়।
      },
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email Address is required.'],
      unique: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact Number is required.'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required.'],
    },
    BloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          '{VALUE} is not a valid blood group. Allowed values: A+, A-, B+, B-, AB+, AB-, O+, O-.',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required.'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required.'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required.'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian information is required.'],
    },
    profileImg: {
      type: String,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual

studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query Middleware
studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline);
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// 3. Create a Model
// variables এর নাম আর model এর নাম সেম রাখতে পারলে ভালো।
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
