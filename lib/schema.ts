import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Must enter a valid email.' }),
  password: z.string().min(1, { message: 'Must enter a password.' }),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Must enter a username.' })
      .max(10, { message: 'Max char for username is 10.' }),
    email: z.string().email({ message: 'Must enter a valid email.' }),
    password: z.string().min(8, { message: 'Must enter a strong password.' }),
    confirmPwd: z.string(),
  })
  .superRefine(({ password, confirmPwd }, ctx) => {
    if (password !== confirmPwd) {
      ctx.addIssue({
        code: 'custom',
        message: 'Confirm password must match password.',
        path: ['confirmPwd'],
      });
    }
  });

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;

// Base schema for a file asset with basic validation
const fileAssetSchema = z.object({
  name: z.string().min(1, { message: 'File name is required.' }),
  type: z.string().min(1, { message: 'File type is required.' }),
  size: z.number().min(1, { message: 'File size must be greater than 0.' }),
  uri: z.string().min(1, { message: 'File URI is required.' }),
  arrayBuffer: z.any().optional(),
  slice: z.any().optional(),
  stream: z.any().optional(),
  text: z.any().optional(),
});

// Schema for video files with a 6MB size constraint
const videoFileSchema = fileAssetSchema.refine((data) => data.size <= 6 * 1024 * 1024, {
  // 3MB
  message: 'Video file size must be less than or equal to 3MB.',
});

// Schema for image files with a 700KB size constraint
const imageFileSchema = fileAssetSchema.refine((data) => data.size <= 700 * 1024, {
  // 700KB
  message: 'Image file size must be less than or equal to 700KB.',
});

export const createSchema = z.object({
  videoTitle: z.string().min(1, { message: 'Must enter video title.' }),
  uploadVideo: videoFileSchema,
  uploadImage: imageFileSchema,
  aiPrompt: z.string().min(1, { message: 'Must enter ai prompt.' }),
});

export type CreateSchema = z.infer<typeof createSchema>;
export type FileAssetSchema = z.infer<typeof fileAssetSchema>;
