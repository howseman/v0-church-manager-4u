import { MONTHS_IN_A_YEAR, CURRENT_YEAR, CHURCH_NAME } from '@/constants'
import { z } from 'zod'

export const membershipRequestSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Campo requerido.',
  }),
  lastName: z.string().min(2, {
    message: 'Campo requerido.',
  }),
  email: z.string().email({
    message: 'Ingresa una dirección de correo válida.',
  }),
  phoneNumber: z.string().min(9, {
    message: 'El número de teléfono debe tener al menos 9 dígitos.',
  }),
  christianSinceMonth: z.enum(MONTHS_IN_A_YEAR, {
    required_error: 'Selecciona un mes.',
  }),
  christianSinceYear: z.coerce
    .number()
    .int()
    .min(CURRENT_YEAR - 100, `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`)
    .max(CURRENT_YEAR, `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`),
  hasBeenBaptized: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
  baptizedOnMonth: z.enum(MONTHS_IN_A_YEAR, {
    required_error: 'Selecciona un mes.',
  }),
  baptizedOnYear: z.coerce
    .number()
    .int()
    .min(CURRENT_YEAR - 100, `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`)
    .max(CURRENT_YEAR, `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`),
  attendingSinceMonth: z.enum(MONTHS_IN_A_YEAR, {
    required_error: 'Selecciona un mes.',
  }),
  attendingSinceYear: z.coerce
    .number()
    .int()
    .min(2020, `El año debe estar entre ${2020} y ${CURRENT_YEAR}`)
    .max(CURRENT_YEAR, `El año debe estar entre ${2020} y ${CURRENT_YEAR}`),
  hasCompletedFaithFoundationsCourse: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
  hasSeenStudiesOnTheChurch: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
  hasReadDoctrinalStatement: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
  questionsOnDoctrinalStatement: z.string().optional(),
  churchMembershipReason: z.string().min(20, {
    message: `Explica brevemente porqué quieres ser miembro de ${CHURCH_NAME}.`,
  }),
  membershipCommitmentAccepted: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
  // requestDate: z.date().default(() => new Date()),
  // status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
})

export type MembershipRequest = z.infer<typeof membershipRequestSchema>

/*
const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Campo requerido.',
  }),
  lastName: z.string().min(2, {
    message: 'Campo requerido.',
  }),
  email: z.string().email({
    message: 'Ingresa una dirección de correo válida.',
  }),
  phoneNumber: z.string().min(9, {
    message: 'El número de teléfono debe tener al menos 9 dígitos.',
  }),
  christianSinceMonth: z.enum(MONTHS_IN_A_YEAR, {
    required_error: 'Selecciona un mes.',
  }),
  christianSinceYear: z.coerce
    .number()
    .int()
    .min(CURRENT_YEAR - 100, `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`)
    .max(CURRENT_YEAR, `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`),
  hasBeenBaptized: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
  baptizedOnMonth: z.enum(MONTHS_IN_A_YEAR, {
    required_error: 'Selecciona un mes.',
  }),
  baptizedOnYear: z.coerce
    .number()
    .int()
    .min(CURRENT_YEAR - 100, `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`)
    .max(CURRENT_YEAR, `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`),
  attendingSinceMonth: z.enum(MONTHS_IN_A_YEAR, {
    required_error: 'Selecciona un mes.',
  }),
  attendingSinceYear: z.coerce
    .number()
    .int()
    .min(2020, `El año debe estar entre ${2020} y ${CURRENT_YEAR}`)
    .max(CURRENT_YEAR, `El año debe estar entre ${2020} y ${CURRENT_YEAR}`),
  hasCompletedFaithFoundationsCourse: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
  hasSeenStudiesOnTheChurch: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
  hasReadDoctrinalStatement: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
  questionsOnDoctrinalStatement: z.string().optional(),
  churchMembershipReason: z.string().min(20, {
    message: `Explica brevemente porqué quieres ser miembro de ${CHURCH_NAME}.`,
  }),
  membershipCommitmentAccepted: z.enum(['yes', 'no'], {
    required_error: 'Selecciona una opción.',
  }),
})
*/
