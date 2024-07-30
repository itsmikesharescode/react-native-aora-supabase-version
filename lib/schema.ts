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

const MAX_VIDEO_SIZE = 3 * 1024 * 1024; // 3MB in bytes
const MAX_IMAGE_SIZE = 600 * 1024; // 600KB in bytes

export const createSchema = z.object({
  videoTitle: z.string().min(1, { message: 'Must enter video title.' }),
  uploadVideo: z.object({
    uri: z.string(),
    type: z.string().startsWith('video/'),
    name: z.string(),
    size: z.number().max(MAX_VIDEO_SIZE, {
      message: `Video must be ${MAX_VIDEO_SIZE / (1024 * 1024)}MB or less`,
    }),
  }),
  uploadImage: z.object({
    uri: z.string(),
    type: z.string().startsWith('image/'),
    name: z.string(),
    size: z.number().max(MAX_IMAGE_SIZE, {
      message: `Image must be ${MAX_IMAGE_SIZE / 1024}KB or less`,
    }),
  }),
  aiPrompt: z.string().min(1, { message: 'Must enter ai prompt.' }),
});

export type CreateSchema = z.infer<typeof createSchema>;
