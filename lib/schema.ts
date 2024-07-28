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
