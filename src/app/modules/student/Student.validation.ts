import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name cannot exceed 20 characters.')
    .refine(
      (value) => /^[A-Z][a-z]*$/.test(value),
      'First Name must start with an uppercase letter and be in capitalized format.',
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .trim()
    .max(20, 'Last Name cannot exceed 20 characters.')
    .refine(
      (value) => /^[A-Za-z]*$/.test(value),
      'Last Name must only contain letters.',
    ),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().nonempty("Father's Name is required."),
  fatherOccupation: z
    .string()
    .trim()
    .nonempty("Father's Occupation is required."),
  fatherContactNo: z
    .string()
    .trim()
    .nonempty("Father's Contact Number is required."),
  motherName: z.string().trim().nonempty("Mother's Name is required."),
  motherOccupation: z
    .string()
    .trim()
    .nonempty("Mother's Occupation is required."),
  motherContactNo: z
    .string()
    .trim()
    .nonempty("Mother's Contact Number is required."),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().nonempty("Local Guardian's Name is required."),
  occupation: z
    .string()
    .trim()
    .nonempty("Local Guardian's Occupation is required."),
  contactNo: z
    .string()
    .trim()
    .nonempty("Local Guardian's Contact Number is required."),
  address: z.string().trim().nonempty("Local Guardian's Address is required."),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        invalid_type_error: "Gender must be 'male', 'female', or 'other'.",
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .trim()
        .email('Invalid email address.')
        .nonempty('Email Address is required.'),
      contactNo: z.string().trim().nonempty('Contact Number is required.'),
      emergencyContactNo: z
        .string()
        .trim()
        .nonempty('Emergency Contact Number is required.'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          invalid_type_error: 'Invalid Blood Group.',
        })
        .optional(),
      presentAddress: z
        .string()
        .trim()
        .nonempty('Present Address is required.'),
      permanentAddress: z
        .string()
        .trim()
        .nonempty('Permanent Address is required.'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

// update validation schema

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateUserNameValidationSchema,
};
