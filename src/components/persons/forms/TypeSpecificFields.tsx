import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { Control, FieldErrors } from "react-hook-form";
import type { CreatePersonDto } from "../../../types/person.types";
import { parseDate } from "../tools";

interface TypeSpecificFieldsProps {
  personType: CreatePersonDto["typ"];
  control: Control<CreatePersonDto>;
  errors: FieldErrors<CreatePersonDto>;
  isLoading?: boolean;
}

export const TypeSpecificFields: React.FC<TypeSpecificFieldsProps> = ({
  personType,
  control,
  errors,
  isLoading = false,
}) => {
  const renderNaturalFields = () => (
    <>
      <Grid size={4}>
        <Controller
          name="natural_family"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="نام خانوادگی *"
              error={!!errors.natural_family}
              helperText={errors.natural_family?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="natural_father_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="نام پدر"
              error={!!errors.natural_father_name}
              helperText={errors.natural_father_name?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="natural_national_code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="کد ملی"
              error={!!errors.natural_national_code}
              helperText={errors.natural_national_code?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="natural_birth_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="تاریخ تولد"
                value={parseDate(field.value)}
                onChange={(date) => field.onChange(date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.natural_birth_date,
                    helperText: errors.natural_birth_date?.message,
                    disabled: isLoading,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={4}>
        <Controller
          name="natural_sex"
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={!!errors.natural_sex}
              disabled={isLoading}
            >
              <FormLabel>جنسیت</FormLabel>
              <Select {...field} value={field.value || ""}>
                <MenuItem value="">
                  <em>انتخاب کنید</em>
                </MenuItem>
                <MenuItem value="M">مرد</MenuItem>
                <MenuItem value="F">زن</MenuItem>
              </Select>
              {errors.natural_sex && (
                <FormHelperText error>
                  {errors.natural_sex.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Grid>
    </>
  );

  const renderLegalFields = () => (
    <>
      <Grid size={4}>
        <Controller
          name="legal_national_code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="شناسه ملی"
              error={!!errors.legal_national_code}
              helperText={errors.legal_national_code?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="legal_register_no"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="شماره ثبت"
              error={!!errors.legal_register_no}
              helperText={errors.legal_register_no?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="legal_establishment_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="تاریخ تاسیس"
                value={parseDate(field.value)}
                onChange={(date) => field.onChange(date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.legal_establishment_date,
                    helperText: errors.legal_establishment_date?.message,
                    disabled: isLoading,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={4}>
        <Controller
          name="legal_manager_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="نام مدیر"
              error={!!errors.legal_manager_name}
              helperText={errors.legal_manager_name?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="legal_manager_family"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="نام خانوادگی مدیر"
              error={!!errors.legal_manager_family}
              helperText={errors.legal_manager_family?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="economic_code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="کد اقتصادی"
              error={!!errors.economic_code}
              helperText={errors.economic_code?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>
    </>
  );

  const renderForeignerFields = () => (
    <>
      <Grid size={4}>
        <Controller
          name="passport_number"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="شماره گذرنامه *"
              error={!!errors.passport_number}
              helperText={errors.passport_number?.message}
              disabled={isLoading}
              required
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="citizen_code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="کد اتباع خارجی"
              error={!!errors.citizen_code}
              helperText={errors.citizen_code?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="citizen_nationality"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="ملیت"
              error={!!errors.citizen_nationality}
              helperText={errors.citizen_nationality?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="natural_family"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="نام خانوادگی"
              error={!!errors.natural_family}
              helperText={errors.natural_family?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="natural_birth_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="تاریخ تولد"
                value={parseDate(field.value)}
                onChange={(date) => field.onChange(date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.natural_birth_date,
                    helperText: errors.natural_birth_date?.message,
                    disabled: isLoading,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={4}>
        <Controller
          name="natural_father_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="نام پدر"
              error={!!errors.natural_father_name}
              helperText={errors.natural_father_name?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>
    </>
  );

  const renderCivilParticipateFields = () => (
    <>
      <Grid size={4}>
        <Controller
          name="legal_national_code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="شناسه ملی"
              error={!!errors.legal_national_code}
              helperText={errors.legal_national_code?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="legal_register_no"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="شماره ثبت"
              error={!!errors.legal_register_no}
              helperText={errors.legal_register_no?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="legal_establishment_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="تاریخ تاسیس"
                value={parseDate(field.value)}
                onChange={(date) => field.onChange(date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.legal_establishment_date,
                    helperText: errors.legal_establishment_date?.message,
                    disabled: isLoading,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid size={4}>
        <Controller
          name="legal_manager_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="نام مدیر"
              error={!!errors.legal_manager_name}
              helperText={errors.legal_manager_name?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Controller
          name="legal_manager_family"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="نام خانوادگی مدیر"
              error={!!errors.legal_manager_family}
              helperText={errors.legal_manager_family?.message}
              disabled={isLoading}
            />
          )}
        />
      </Grid>
    </>
  );

  switch (personType) {
    case "NATURAL":
      return renderNaturalFields();
    case "LEGAL":
      return renderLegalFields();
    case "FOREIGNER":
      return renderForeignerFields();
    case "CIVIL_PARTICIPATE":
      return renderCivilParticipateFields();
    default:
      return null;
  }
};