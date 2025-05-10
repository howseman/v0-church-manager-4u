export type MembershipRequestStatus = 'pending' | 'approved' | 'rejected' | 'terminated'

export interface BasicMemberData {
  firstName: string
  lastName: string
  email?: string
  phoneNumber: string
}

export interface MembershipRequest extends BasicMemberData {
  christianSinceMonth: string
  christianSinceYear: number
  hasBeenBaptized: 'yes' | 'no'
  baptizedOnMonth?: string
  baptizedOnYear?: number
  attendingSinceMonth: string
  attendingSinceYear: number
  hasCompletedFaithFoundationsCourse: 'yes' | 'no'
  hasSeenStudiesOnTheChurch: 'yes' | 'no'
  hasReadDoctrinalStatement: 'yes' | 'no'
  questionsOnDoctrinalStatement?: string
  churchMembershipReason: string
  membershipCommitmentAccepted: 'yes' | 'no'
}

export interface MembershipRequestWithStatus extends MembershipRequest {
  requestDate: Date
  status: MembershipRequestStatus
}
