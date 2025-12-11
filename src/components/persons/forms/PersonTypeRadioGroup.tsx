import React from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import type { CreatePersonDto } from "../../../types/person.types";

interface PersonTypeRadioGroupProps {
  control: Control<CreatePersonDto>;
  errors: FieldErrors<CreatePersonDto>;
  isLoading?: boolean;
}

const PERSON_TYPES = [
  { value: "NATURAL", label: "حقیقی" },
  { value: "LEGAL", label: "حقوقی" },
  { value: "CIVIL_PARTICIPATE", label: "مشارکت مدنی" },
  { value: "FOREIGNER", label: "اتباع خارجی" },
] as const;

export const PersonTypeRadioGroup: React.FC<PersonTypeRadioGroupProps> = ({
  control,
  errors,
  isLoading = false,
}) => {
  return (
    <FormControl fullWidth error={!!errors.typ}>
      <Controller
        name="typ"
        control={control}
        render={({ field }) => (
          <RadioGroup
            {...field}
            row
            aria-labelledby="person-type-radio-buttons-group-label"
          >
            {PERSON_TYPES.map((type) => (
              <FormControlLabel
                key={type.value}
                value={type.value}
                control={<Radio />}
                label={type.label}
                disabled={isLoading}
              />
            ))}
          </RadioGroup>
        )}
      />
      {errors.typ && (
        <FormHelperText error>{errors.typ.message}</FormHelperText>
      )}
    </FormControl>
  );
};