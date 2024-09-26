import z from 'zod';
    
export const signupInput = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    mobile: z.string().min(10).max(10)
})
export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type SigninInput = z.infer<typeof signinInput>