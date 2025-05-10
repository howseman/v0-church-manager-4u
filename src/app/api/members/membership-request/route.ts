import { NextResponse } from 'next/server'
import { z } from 'zod'

import { membershipRequestSchema } from '@/app/shared/schemas/membership-request.schema'
import { CreateMembershipRequestUseCase } from './services/create-membership-request.uc'
import { MembershipRepository } from '../repositories/Membership.repository'

export async function POST(request: Request) {
  const membershipRepository = new MembershipRepository()
  const membershipRequestUseCase = new CreateMembershipRequestUseCase(membershipRepository)

  try {
    const body = await request.json()
    const validatedInput = membershipRequestSchema.parse(body)
    const result = await membershipRequestUseCase.execute(validatedInput)

    return NextResponse.json(
      {
        success: false,
        error: 'Membership request could not be completed.',
        data: null,
      },
      { status: 500 },
    )

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
          // message: 'Failed to process membership request',
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
