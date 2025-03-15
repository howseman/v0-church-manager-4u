import React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CURRENT_YEAR, MONTHS_IN_A_YEAR } from "@/constants";

interface MonthYearPickerProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  monthFieldName: string;
  yearFieldName: string;
  minYearValue?: number;
  label?: string;
}

export function MonthYearPicker({
  form,
  monthFieldName,
  yearFieldName,
  minYearValue,
  label,
}: MonthYearPickerProps) {
  React.useEffect(() => {
    form.trigger("onBlurValidationTrigger");
  }, [form]);

  return (
    <div style={{ marginTop: 0 }}>
      {label && (
        <label
          className="text-sm font-semibold"
          style={{ display: "block", marginBottom: 4, marginTop: 0 }}
        >
          {label}
        </label>
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={monthFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Mes</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un mes" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MONTHS_IN_A_YEAR.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={yearFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Año</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(ensureNumeric(e.target.value))
                  }
                  min={minYearValue}
                  max={CURRENT_YEAR}
                  onBlur={(e) => {
                    field.onBlur();
                    form.trigger("onBlurValidationTrigger");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

/**
 * Local helper function used to avoid errors when the user types a non-numeric character or the field is empty (NaN)
 */
function ensureNumeric(value: string): string {
  return value.replace(/[^0-9]/g, "");
}
