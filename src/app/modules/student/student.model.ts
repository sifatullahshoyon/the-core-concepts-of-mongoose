import { Schema, model } from 'mongoose';
import {
  Tguardian,
  TlocalGuardian,
  Tstudent,
  TuserName,
} from './student.interface';

// 2. Create a Schema corresponding to the document interface.

const userNameSchema = new Schema<TuserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Tguardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TlocalGuardian>({
  name: {
    type: String,
    require: true,
  },
  occupation: {
    type: String,
    require: true,
  },
  contactNo: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

const studentSchema = new Schema<Tstudent>({
  // interface এর ক্ষেত্রে type গুলো থাকে small letter আর mongoose এর ক্ষেত্রে type গুলো থাকে Capitalize
  id: { type: String },
  name: userNameSchema,
  // typescript এ যেইটা union type mongoose এ সেইটা enum type
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  BloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'block'],
    default: 'active',
  },
});

// 3. Create a Model
// variables এর নাম আর model এর নাম সেম রাখতে পারলে ভালো।
export const StudentModel = model<Tstudent>('Student', studentSchema);
