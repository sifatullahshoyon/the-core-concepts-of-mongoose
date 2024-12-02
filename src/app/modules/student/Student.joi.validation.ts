// creating a schema validation suing joi

import Joi from 'joi';

// const joivalidationSchema = Joi.object({
//   id: Joi.string(),
//   name: {
//     firstName: Joi.string().max(20).required(),
//     middleName: Joi.string().max(20),
//     lastName: Joi.string().max(20).required(),
//   },
//   gender: Joi.string().required().valid(['male', 'female', 'other']),
// });

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/, 'capitalize format') // Ensures the first letter is uppercase
    .messages({
      'string.empty': 'First Name is required.',
      'string.max': 'First Name can not be more than 20 characters.',
      'string.pattern.base': '{#value} is not in capitalize format.',
    }),
  middleName: Joi.string().trim().allow(''), // Allow optional middle name
  lastName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Za-z]+$/, 'alpha characters only') // Ensures only alphabetic characters
    .messages({
      'string.empty': 'Last Name is required.',
      'string.max': 'Last Name can not be more than 20 characters.',
      'string.pattern.base': '{#value} is not valid Name.',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': "Father's Name is required.",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': "Father's Occupation is required.",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.empty': "Father's Contact Number is required.",
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': "Mother's Name is required.",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': "Mother's Occupation is required.",
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.empty': "Mother's Contact Number is required.",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': "Local Guardian's Name is required.",
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': "Local Guardian's Occupation is required.",
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': "Local Guardian's Contact Number is required.",
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': "Local Guardian's Address is required.",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required.',
  }),
  name: userNameValidationSchema.required().messages({
    'object.base': 'Student Name is required.',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only':
      '{#value} is not a valid gender. Allowed values: male, female, other.',
    'string.empty': 'Gender is required.',
  }),
  dateOfBirth: Joi.string().isoDate().messages({
    'string.isoDate': 'Date of Birth must be in ISO date format.',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email Address is required.',
    'string.email': '{#value} is not a valid email type.',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Contact Number is required.',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Emergency Contact Number is required.',
  }),
  BloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only':
        '{#value} is not a valid blood group. Allowed values: A+, A-, B+, B-, AB+, AB-, O+, O-.',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present Address is required.',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent Address is required.',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian information is required.',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local Guardian information is required.',
  }),
  profileImg: Joi.string().uri().optional(),
  isActive: Joi.string().valid('active', 'block').default('active').messages({
    'any.only':
      '{#value} is not a valid status. Allowed values: active, block.',
  }),
});

export default studentValidationSchema;
