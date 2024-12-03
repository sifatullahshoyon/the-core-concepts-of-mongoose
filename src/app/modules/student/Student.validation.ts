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

const studentValidationSchema = z.object({
  id: z.string().nonempty('Student ID is required.'),
  password: z.string().max(20),
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
  BloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      invalid_type_error: 'Invalid Blood Group.',
    })
    .optional(),
  presentAddress: z.string().trim().nonempty('Present Address is required.'),
  permanentAddress: z
    .string()
    .trim()
    .nonempty('Permanent Address is required.'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z
    .enum(['active', 'block'], {
      invalid_type_error: "Status must be 'active' or 'block'.",
    })
    .default('active'),
});

// Export for use
export default studentValidationSchema;
