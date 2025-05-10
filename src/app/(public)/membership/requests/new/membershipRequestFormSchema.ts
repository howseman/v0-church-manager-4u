import { z } from 'zod'

import { membershipRequestSchema } from '@/app/shared/schemas/membership-request.schema'

export const membershipRequestFormSchema = membershipRequestSchema
export type MembershipRequestFormInput = z.infer<typeof membershipRequestFormSchema>
