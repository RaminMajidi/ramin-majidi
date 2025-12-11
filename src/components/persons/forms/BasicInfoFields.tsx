import React from "react";
import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import type { CreatePersonDto } from "../../../types/person.types";

interface BasicInfoFieldsProps {
  personType: CreatePersonDto["typ"];
  control: Control<CreatePersonDto>;
  errors: FieldErrors<CreatePersonDto>;
  isLoading?: boolean;
}

export const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  personType,
  control,
  errors,
  isLoading = false,
}) => {
  return (
    <>
      <Grid size={4}>
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="کد *"
              error={!!errors.code}
              helperText={errors.code?.message}
              disabled={isLoading}
              required
            />
          )}
        />
      </Grid>

      {personType === "NATURAL" && (
        <Grid size={4}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="نام *"
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
                required
              />
            )}
          />
        </Grid>
      )}

      {personType !== "NATURAL" && (
        <Grid size={4}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="نام *"
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isLoading}
                required
              />
            )}
          />
        </Grid>
      )}
    </>
  );
};