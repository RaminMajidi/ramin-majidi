import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Typography,
  FormHelperText,
  Grid,
  FormLabel,
  MenuItem,
  Select,
  Divider,
  Stack,
} from "@mui/material";
import {
  useForm,
  Controller,
  type SubmitHandler,
  type FieldValues,
  useWatch,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { CreatePersonDto, TPerson } from "../../../types/person.types";
import { getPersonSchema } from "../core/person.schema";
import { defaultValues } from "../core/data";
import usePersonForm from "../hooks/usePersoneForm";
import {
  ensureRequiredFields,
  getFieldsToValidateByType,
  parseDate,
} from "../tools";

interface PersonFormProps {
  onSubmit: (data: CreatePersonDto) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
  initialData?: TPerson | null;
}

const PersonForm: React.FC<PersonFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  error,
  initialData,
}) => {
  // custom hook
  const { transformInitialDataForForm, formatDateForBackend } = usePersonForm();

  // yup tools
  const {
    control,
    handleSubmit,
    trigger,
    clearErrors,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreatePersonDto>({
    defaultValues: initialData
      ? transformInitialDataForForm(initialData)
      : defaultValues,
    resolver: yupResolver(
      getPersonSchema(initialData?.typ || "NATURAL") as any
    ),
    mode: "onChange",
  });

  // استفاده از useWatch برای نوع شخص
  const watchedPersonType = useWatch({
    control,
    name: "typ",
    defaultValue: initialData?.typ || "NATURAL",
  });

  // استفاده از watchedPersonType به عنوان personType
  const personType = watchedPersonType;

  // useEffect اصلاح شده - بدون setPersonType
  useEffect(() => {
    if (watchedPersonType) {
      clearErrors();

      // وقتی نوع تغییر می‌کند، برخی فیلدها را reset کنیم
      if (watchedPersonType === "NATURAL") {
        setValue("code", "");
        setValue("legal_national_code", "");
        setValue("legal_register_no", "");
        setValue("legal_manager_name", "");
        setValue("legal_manager_family", "");
        setValue("legal_establishment_date", "");
      } else if (
        watchedPersonType === "LEGAL" ||
        watchedPersonType === "CIVIL_PARTICIPATE"
      ) {
        setValue("natural_family", "");
        setValue("natural_father_name", "");
        setValue("natural_national_code", "");
        setValue("natural_birth_date", "");
        setValue("natural_sex", null);
        setValue("is_internal_citizenship", false);
        setValue("passport_number", "");
        setValue("citizen_code", "");
        setValue("citizen_nationality", "");
      } else if (watchedPersonType === "FOREIGNER") {
        setValue("legal_national_code", "");
        setValue("legal_register_no", "");
        setValue("legal_manager_name", "");
        setValue("legal_manager_family", "");
        setValue("legal_establishment_date", "");
      }
    }
  }, [watchedPersonType, clearErrors, setValue]); // حذف personType از dependencies

  // هنگامی که initialData تغییر می‌کند، form را با مقادیر جدید reset کنیم
  // هنگامی که initialData تغییر می‌کند، form را reset کنیم
  useEffect(() => {
    if (initialData) {
      const transformedData = transformInitialDataForForm(initialData);
      reset(transformedData);
    }
  }, [initialData, reset, transformInitialDataForForm]);

  // تابع submit
  const handleFormSubmit: SubmitHandler<CreatePersonDto> = async (data) => {
    console.log("Form data before processing:", data);

    // آماده‌سازی داده برای ارسال به بک‌اند
    let processedData: any = { ...data };

    // تبدیل تاریخ‌ها
    if (processedData.natural_birth_date instanceof Date) {
      processedData.natural_birth_date = formatDateForBackend(
        processedData.natural_birth_date
      );
    }

    if (processedData.legal_establishment_date instanceof Date) {
      processedData.legal_establishment_date = formatDateForBackend(
        processedData.legal_establishment_date
      );
    }

    // اطمینان از اینکه همه فیلدهای required برای بک‌اند مقدار default داشته باشند
    processedData = ensureRequiredFields(processedData, personType);

    // فقط فیلدهای مربوط به نوع فعلی را validate کنیم
    const fieldsToValidate = getFieldsToValidateByType(personType);
    const isValid = await trigger(fieldsToValidate as any);

    console.log("Validation result:", isValid);
    if (isValid) {
      onSubmit(processedData);
    }
  };

  // اطمینان از اینکه همه فیلدهای required مقدار مناسب داشته باشند

  // رندر فیلدهای خاص برای هر نوع
  const renderTypeSpecificFields = () => {
    switch (personType) {
      case "NATURAL":
        return (
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
              <Controller
                name="natural_birth_date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  </LocalizationProvider>
                )}
              />
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

      case "LEGAL":
        return (
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
              <Controller
                name="legal_establishment_date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  </LocalizationProvider>
                )}
              />
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

      case "FOREIGNER":
        return (
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
              <Controller
                name="natural_birth_date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  </LocalizationProvider>
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
          </>
        );

      case "CIVIL_PARTICIPATE":
        return (
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
              <Controller
                name="legal_establishment_date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  </LocalizationProvider>
                )}
              />
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

      default:
        return null;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(
            handleFormSubmit as SubmitHandler<FieldValues>
          )}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            {initialData ? "ویرایش شخص" : "ایجاد شخص"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            لطفا جهت {initialData ? "ویرایش" : "ایجاد"} شخص فرم زیر را تکمیل
            فرمایید.
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Grid container spacing={3}>
            {/* Type Selection */}
            <Grid size={12}>
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
                      <FormControlLabel
                        value="NATURAL"
                        control={<Radio />}
                        label="حقیقی"
                        disabled={isLoading}
                      />
                      <FormControlLabel
                        value="LEGAL"
                        control={<Radio />}
                        label="حقوقی"
                        disabled={isLoading}
                      />
                      <FormControlLabel
                        value="CIVIL_PARTICIPATE"
                        control={<Radio />}
                        label="مشارکت مدنی"
                        disabled={isLoading}
                      />
                      <FormControlLabel
                        value="FOREIGNER"
                        control={<Radio />}
                        label="اتباع خارجی"
                        disabled={isLoading}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.typ && (
                  <FormHelperText error>{errors.typ.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Divider sx={{ my: 2, width: "100%" }} />

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

            {/* Basic Info */}
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
              <>
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
              </>
            )}

            {/* Type Specific Fields */}
            {renderTypeSpecificFields()}

            {/* اطلاعات تماس برای همه انواع */}
            <Grid size={12}>
              <Divider sx={{ my: 2, width: "100%" }} />
              <Typography variant="subtitle1" gutterBottom>
                اطلاعات تماس
              </Typography>
            </Grid>

            <Grid size={4}>
              <Controller
                name="default_phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="تلفن"
                    error={!!errors.default_phone}
                    helperText={errors.default_phone?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid size={4}>
              <Controller
                name="default_mobile"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="موبایل"
                    error={!!errors.default_mobile}
                    helperText={errors.default_mobile?.message}
                    disabled={isLoading}
                    inputProps={{ maxLength: 11 }}
                  />
                )}
              />
            </Grid>

            <Grid size={4}>
              <Controller
                name="default_email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="ایمیل"
                    type="email"
                    error={!!errors.default_email}
                    helperText={errors.default_email?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

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

            {/* Buttons */}
            <Grid size={12}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                sx={{ mt: 3 }}
              >
                {onCancel && (
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    انصراف
                  </Button>
                )}
                <Button type="submit" variant="contained" disabled={isLoading}>
                  {isLoading
                    ? "در حال ذخیره..."
                    : initialData
                    ? "بروزرسانی"
                    : "تایید"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default PersonForm;
