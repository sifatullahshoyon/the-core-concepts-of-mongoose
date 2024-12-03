import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
// import validator from 'validator';

// 2. Create a Schema corresponding to the document interface.

const userNameSchema = new Schema<TUserName>({
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

const studentSchema = new Schema<TStudent, StudentModel>({
  // interface এর ক্ষেত্রে type গুলো থাকে small letter আর mongoose এর ক্ষেত্রে type গুলো থাকে Capitalize
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required.'],
    unique: true,
    maxlength: [20, 'Password can not be more than 20 characters.'],
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

// pre save middleware / hook
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');

  // hashing password and save into DB

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook : will work on create() save()
studentSchema.post('save', function () {
  console.log(this, 'post hook: we will saved our data');
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
