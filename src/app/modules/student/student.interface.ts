// import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export type Tguardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TuserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TlocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Tstudent = {
  id: string;
  name: TuserName;
  gender: 'male' | 'female' | 'other'; // union type literal
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  BloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Tguardian;
  localGuardian: TlocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'block';
};
