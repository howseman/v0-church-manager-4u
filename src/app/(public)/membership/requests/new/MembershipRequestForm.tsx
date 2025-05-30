'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MonthYearPicker } from '@/components/MonthYearPicker'
import { CHURCH_NAME, CURRENT_YEAR, MONTHS_IN_A_YEAR } from '@/constants'
import {
  MembershipRequestFormInput,
  membershipRequestFormSchema,
} from './membershipRequestFormSchema'

async function onSubmit(data: MembershipRequestFormInput) {
  try {
    const response = await fetch('/api/members/membership-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.log('Error response:', response)
      throw new Error('Se presentó un Error al registrar la solicitud')
    }

    const result = await response.json()
    console.log(JSON.stringify(result, null, 2))

    toast.success('Solicitud recibida con éxito', {
      description:
        'Tu solicitud de membresía ha sido recibida. Serás redirigido a la pagina de inicio en unos segundos.',
      duration: 6000,
    })
  } catch (error) {
    console.error('Error:', error)
    toast.error('Error al registrar la solicitud', {
      description: 'Por favor intenta nuevamente más tarde.',
    })
  }
}

function onInvalid(errors: Record<string, unknown>) {
  console.log('Form validation errors:', errors)
  toast.error('Por favor completa todos los campos requeridos', {
    description: 'Asegúrate de que todos los campos estén correctamente diligenciados.',
  })
}

export default function MembershipRequestForm() {
  const [showHasBeenBaptizedFields, setShowHasBeenBaptizedFields] = React.useState(false)
  const form = useForm<MembershipRequestFormInput>({
    resolver: zodResolver(membershipRequestFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      christianSinceMonth: MONTHS_IN_A_YEAR[0],
      christianSinceYear: CURRENT_YEAR,
      hasBeenBaptized: 'no',
      baptizedOnMonth: MONTHS_IN_A_YEAR[0],
      baptizedOnYear: CURRENT_YEAR,
      attendingSinceMonth: MONTHS_IN_A_YEAR[0],
      attendingSinceYear: CURRENT_YEAR,
      hasCompletedFaithFoundationsCourse: 'no',
      hasSeenStudiesOnTheChurch: 'no',
      hasReadDoctrinalStatement: 'no',
      questionsOnDoctrinalStatement: '',
      churchMembershipReason: '',
      membershipCommitmentAccepted: 'no',
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-8 max-w-[500px] mx-auto p-4"
      >
        <p className="text-center">Por favor diligencia todos los campos del formulario</p>

        <fieldset className="space-y-4 p-4 rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-950">
          <legend className="text-xl font-semibold">Datos personales</legend>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem style={{ marginTop: 0 }}>
                <FormLabel className="font-semibold">Nombre(s)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Apellido(s)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Número de teléfono</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset className="space-y-5 p-4 rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-950">
          <legend className="text-xl font-semibold">Vida cristiana</legend>
          <MonthYearPicker
            form={form}
            monthFieldName="christianSinceMonth"
            yearFieldName="christianSinceYear"
            minYearValue={CURRENT_YEAR - 100}
            label="Cristiano desde"
          />

          <hr />

          <FormField
            control={form.control}
            name="hasBeenBaptized"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-semibold">
                  Has sido bautizado(a) en una iglesia cristiana evangélica?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value)
                      setShowHasBeenBaptizedFields(value === 'yes')
                    }}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Sí</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {showHasBeenBaptizedFields && (
            <MonthYearPicker
              form={form}
              monthFieldName="baptizedOnMonth"
              yearFieldName="baptizedOnYear"
              minYearValue={CURRENT_YEAR - 100}
            />
          )}
        </fieldset>

        <fieldset className="space-y-8 p-4 rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-950">
          <legend className="text-xl font-semibold">Iglesia</legend>
          <MonthYearPicker
            form={form}
            monthFieldName="attendingSinceMonth"
            yearFieldName="attendingSinceYear"
            minYearValue={2020}
            label={`Desde cuándo asistes a ${CHURCH_NAME}?`}
          />

          <FormField
            control={form.control}
            name="hasCompletedFaithFoundationsCourse"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-semibold">
                  Has completado el curso de fundamentos de la fe?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel>Si</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel>No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasSeenStudiesOnTheChurch"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-semibold">
                  Has{' '}
                  <a
                    href="#"
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    escuchado/visto
                  </a>{' '}
                  los estudios sobre la iglesia?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Si</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasReadDoctrinalStatement"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-semibold">
                  Has{' '}
                  <a
                    href="#"
                    className="text-blue-500 underline"
                  >
                    leído
                  </a>{' '}
                  la declaración doctrinal y la filosofía de ministerio de {CHURCH_NAME}?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Si</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="questionsOnDoctrinalStatement"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Tienes alguna pregunta o desacuerdo con nuestra declaración doctrinal y filosofía
                  de ministerio?
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset className="space-y-5 p-4 rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-950">
          <FormField
            control={form.control}
            name="churchMembershipReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Porqué quieres ser miembro de {CHURCH_NAME}?
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="membershipCommitmentAccepted"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-semibold">
                  Has{' '}
                  <a
                    href="#"
                    className="text-blue-500 underline"
                  >
                    leído
                  </a>{' '}
                  y aceptas voluntariamente el compromiso de membresía?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Si</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <Button
          type="submit"
          className="w-full"
        >
          Enviar
        </Button>
      </form>
    </Form>
  )
}
