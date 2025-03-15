import { NextResponse } from 'next/server'
import { z } from 'zod'

import { membershipRequestSchema } from '@/app/shared/membership-request.schema'
import { CreateMembershipRequestService } from './services/create-membership-request.service'
import { MembershipRepository } from '../repositories/Memebership.repository'

export async function POST(request: Request) {
  const membershipRepository = new MembershipRepository()
  const membershipRequestService = new CreateMembershipRequestService(membershipRepository)

  try {
    const body = await request.json()
    const validatedData = membershipRequestSchema.parse({
      ...body,
      requestDate: new Date(),
    })

    const result = await membershipRequestService.execute(validatedData)

    return NextResponse.json(
      {
        success: true,
        message: 'Membership request received successfully',
        data: result,
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    // Handle other errors
    console.error('Error processing membership request:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process membership request',
      },
      { status: 500 },
    )
  }
}
