import { MembershipRequestInput } from '@/app/shared/schemas/membership-request.schema'
import { MembershipRepository } from '../../repositories/Membership.repository'
import { MembershipRequestWithStatus } from '@/app/shared/types'

export class CreateMembershipRequestUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  async execute(input: MembershipRequestInput) {
    const data: MembershipRequestWithStatus = {
      ...input,
      requestDate: new Date(),
      status: 'pending',
    }

    return this.membershipRepository.save(data)
  }
}
