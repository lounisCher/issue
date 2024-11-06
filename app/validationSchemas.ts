import { string, z } from "zod";

export const issueSchema = z.object({
  title: string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  status: z.string().min(1).max(15).optional(),
});

export const patchIssueSchema = z.object({
  title: string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1, "Description is required").max(65535)
  .optional(),
  assignedToUserId: z.string().min(1, "AssignedToUserId is required").max(255).optional().nullable()
  
});
