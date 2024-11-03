import {string, z} from 'zod'

export const createIssuesSchema = z.object({
    title: string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
});