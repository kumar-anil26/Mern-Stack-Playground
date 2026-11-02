import z from 'zod'

export const userRegisterSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be atleast 2 character'),
        email: z.string({ required_error: 'Email is required' }).email('Please enter a vlid email address.'),
        password: z.string({required_error:'Passwrod is required'}).min(6,'Password must be at least 6 character')
    })
})