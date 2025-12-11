import React from "react";
import { Grid, TextField, Divider, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import type { CreatePersonDto } from "../../../types/person.types";

interface ContactInfoFieldsProps {
  control: Control<CreatePersonDto>;
  errors: FieldErrors<CreatePersonDto>;
  isLoading?: boolean;
}

export const ContactInfoFields: React.FC<ContactInfoFieldsProps> = ({
  control,
  errors,
  isLoading = false,
}) => {
  const contactFields = [
    {
      name: "default_phone" as const,
      label: "تلفن",
      gridSize: 4,
      type: "text" as const,
    },
    {
      name: "default_mobile" as const,
      label: "موبایل",
      gridSize: 4,
      type: "text" as const,
      inputProps: { maxLength: 11 },
    },
    {
      name: "default_email" as const,
      label: "ایمیل",
      gridSize: 4,
      type: "email" as const,
    },
  ];

  return (
    <>
      <Grid size={12}>
        <Divider sx={{ my: 2, width: "100%" }} />
        <Typography variant="subtitle1" gutterBottom>
          اطلاعات تماس
        </Typography>
      </Grid>

      {contactFields.map((field) => (
        <Grid key={field.name} size={field.gridSize}>
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                fullWidth
                label={field.label}
                type={field.type}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message}
                disabled={isLoading}
                inputProps={field.inputProps}
              />
            )}
          />
        </Grid>
      ))}

      <Grid size={12}>
        <Controller
          name="default_address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="آدرس"
              multiline
              rows={2}
              error={!!errors.default_address}
              helperText={errors.default_address?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>
    </>
  );
};