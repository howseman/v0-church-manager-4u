"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MonthYearPicker } from "@/components/MonthYearPicker";
import { CHURCH_NAME, CURRENT_YEAR, MONTHS_IN_A_YEAR } from "@/constants";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Campo requerido.",
  }),
  lastName: z.string().min(2, {
    message: "Campo requerido.",
  }),
  email: z.string().email({
    message: "Ingresa una dirección de correo válida.",
  }),
  phoneNumber: z.string().min(9, {
    message: "El número de teléfono debe tener al menos 9 dígitos.",
  }),
  christianSinceMonth: z.enum(MONTHS_IN_A_YEAR, {
    required_error: "Selecciona un mes.",
  }),
  christianSinceYear: z.coerce
    .number()
    .int()
    .min(
      CURRENT_YEAR - 100,
      `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`
    )
    .max(
      CURRENT_YEAR,
      `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`
    ),
  hasBeenBaptized: z.enum(["yes", "no"], {
    required_error: "Selecciona una opción.",
  }),
  baptizedOnMonth: z.enum(MONTHS_IN_A_YEAR, {
    required_error: "Selecciona un mes.",
  }),
  baptizedOnYear: z.coerce
    .number()
    .int()
    .min(
      CURRENT_YEAR - 100,
      `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`
    )
    .max(
      CURRENT_YEAR,
      `El año debe estar entre ${CURRENT_YEAR - 100} y ${CURRENT_YEAR}`
    ),
  attendingSinceMonth: z.enum(MONTHS_IN_A_YEAR, {
    required_error: "Selecciona un mes.",
  }),
  attendingSinceYear: z.coerce
    .number()
    .int()
    .min(2020, `El año debe estar entre ${2020} y ${CURRENT_YEAR}`)
    .max(CURRENT_YEAR, `El año debe estar entre ${2020} y ${CURRENT_YEAR}`),
  hasCompletedFaithFoundationsCourse: z.enum(["yes", "no"], {
    required_error: "Selecciona una opción.",
  }),
  hasSeenStudiesOnTheChurch: z.enum(["yes", "no"], {
    required_error: "Selecciona una opción.",
  }),
  hasReadDoctrinalStatement: z.enum(["yes", "no"], {
    required_error: "Selecciona una opción.",
  }),
  questionsOnDoctrinalStatement: z.string().optional(),
  churchMembershipReason: z.string().min(20, {
    message: `Explica brevemente porqué quieres ser miembro de ${CHURCH_NAME}.`,
  }),
  membershipCommitmentAccepted: z.enum(["yes", "no"], {
    required_error: "Selecciona una opción.",
  }),
});

function onSubmit(data: z.infer<typeof FormSchema>) {
  toast("You submitted the following values:", {
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}

export default function MembershipRequestForm() {
  const [showHasBeenBaptizedFields, setShowHasBeenBaptizedFields] =
    React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      christianSinceMonth: MONTHS_IN_A_YEAR[0],
      christianSinceYear: CURRENT_YEAR,
      hasBeenBaptized: "no",
      baptizedOnMonth: MONTHS_IN_A_YEAR[0],
      baptizedOnYear: CURRENT_YEAR,
      attendingSinceMonth: MONTHS_IN_A_YEAR[0],
      attendingSinceYear: CURRENT_YEAR,
      hasCompletedFaithFoundationsCourse: "no",
      hasSeenStudiesOnTheChurch: "no",
      hasReadDoctrinalStatement: "no",
      questionsOnDoctrinalStatement: "",
      churchMembershipReason: "",
      membershipCommitmentAccepted: "no",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[500px] mx-auto p-4"
      >
        <p className="text-center">
          Por favor diligencia todos los campos del formulario
        </p>

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
                <FormLabel className="font-semibold">
                  Correo electrónico
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                <FormLabel className="font-semibold">
                  Número de teléfono
                </FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
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
                      field.onChange(value);
                      setShowHasBeenBaptizedFields(value === "yes");
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
                  Has{" "}
                  <a
                    href="#"
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    escuchado/visto
                  </a>{" "}
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
                  Has{" "}
                  <a href="#" className="text-blue-500 underline">
                    leído
                  </a>{" "}
                  la declaración doctrinal y la filosofía de ministerio de{" "}
                  {CHURCH_NAME}?
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
                  Tienes alguna pregunta o desacuerdo con nuestra declaración
                  doctrinal y filosofía de ministerio?
                </FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
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
                  <Textarea className="resize-none" {...field} />
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
                  Has{" "}
                  <a href="#" className="text-blue-500 underline">
                    leído
                  </a>{" "}
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

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </Form>
  );
}

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { cn } from "@/lib/utils";

// function CustomDialog() {
//   return (
//     <Dialog>
//       <DialogTrigger>Open</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Are you absolutely sure?</DialogTitle>
//           <DialogDescription>
//             This action cannot be undone. This will permanently delete your account
//             and remove your data from our servers.
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   )
// }

// function DoctrinalStatementDialogContent() {
//   return (
//     <Dialog>
//       <DialogTrigger>Open</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Doctrinal Statement</DialogTitle>
//           <DialogDescription>
//             This is the doctrinal statement of {CHURCH_NAME}. Please read it carefully.
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   )
// }

{
  /* <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */
}

{
  /* <div className="flex gap-4">
          <FormField
            control={form.control}
            name="christianSince"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Soy cristiano hace</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="christianSincePeriodName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>&nbsp;</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select something" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="year(s)">Year(s)</SelectItem>
                    <SelectItem value="month(s)">Month(s)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */
}
