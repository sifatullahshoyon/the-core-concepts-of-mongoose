import { Schema, model } from 'mongoose';
import {
  Tguardian,
  TlocalGuardian,
  Tstudent,
  TuserName,
} from './student.interface';
// import validator from 'validator';

// 2. Create a Schema corresponding to the document interface.

const userNameSchema = new Schema<TuserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required.'],
    trim: true, // remove whitespace after & before words
    maxLength: [20, 'First Name can not be more than 20 characters'],
    // custom validators
    // validate: {
    //   validator: function (value: string): boolean {
    //     // console.log(value);
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     if (value !== firstNameStr) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
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
    // validate: {
    //   validator: (value: string) => {
    //     return validator.isAlpha(value);
    //   },
    //   message: '{VALUE} is not valid Name',
    // },
  },
});

const guardianSchema = new Schema<Tguardian>({
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

const localGuardianSchema = new Schema<TlocalGuardian>({
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

const studentSchema = new Schema<Tstudent>({
  // interface এর ক্ষেত্রে type গুলো থাকে small letter আর mongoose এর ক্ষেত্রে type গুলো থাকে Capitalize
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
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
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email Address is required.'],
    unique: true,
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type',
    // },
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
  isActive: {
    type: String,
    enum: {
      values: ['active', 'block'],
      message: '{VALUE} is not a valid status. Allowed values: active, block.',
    },
    default: 'active',
  },
});

// 3. Create a Model
// variables এর নাম আর model এর নাম সেম রাখতে পারলে ভালো।
export const StudentModel = model<Tstudent>('Student', studentSchema);
