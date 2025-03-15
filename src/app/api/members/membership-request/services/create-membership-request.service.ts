import { MembershipRepository } from '../../repositories/Memebership.repository'

export class CreateMembershipRequestService {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  async execute(data) {
    // Here you would typically save the data to your database
    // For example with Prisma, MongoDB, etc.
    // await db.membershipRequest.create({ data: validatedData });
    // new MembershipRequestService().create(data);
    return this.membershipRepository.save(data)
  }
}
