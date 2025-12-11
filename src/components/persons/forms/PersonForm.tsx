import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Paper, Typography, Grid, Divider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  useWatch, 
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { CreatePersonDto, TPerson } from "../../../types/person.types";
import { getPersonSchema } from "../core/person.schema";
import { defaultValues } from "../core/data";
import { ensureRequiredFields, getFieldsToValidateByType } from "../tools";
import usePersonForm from "../hooks/usePersonForm";


import { PersonTypeRadioGroup } from "./PersonTypeRadioGroup";
import { BasicInfoFields } from "./BasicInfoFields";
import { TypeSpecificFields } from "./TypeSpecificFields";
import { ContactInfoFields } from "./ContactInfoFields";
import { FormButtons } from "./FormButtons";

interface PersonFormProps {
  onSubmit: (data: CreatePersonDto) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
  initialData?: TPerson | null;
}

export const PersonForm: React.FC<PersonFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  error,
  initialData,
}) => {
  const { transformInitialDataForForm, formatDateForBackend } = usePersonForm();

  const formMethods = useForm<CreatePersonDto>({
    defaultValues: useMemo(
      () =>
        initialData ? transformInitialDataForForm(initialData) : defaultValues,
      [initialData, transformInitialDataForForm]
    ),
    resolver: yupResolver(
      getPersonSchema(initialData?.typ || "NATURAL") as any
    ),
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    trigger,
    clearErrors,
    setValue,
    formState: { errors },
    reset,
    // حذف watch از اینجا
  } = formMethods;

  // استفاده از useWatch به جای watch
  const currentPersonType = useWatch({
    control,
    name: "typ",
    defaultValue: initialData?.typ || "NATURAL",
  });

  const handleTypeChange = useCallback(() => {
    clearErrors();

    if (currentPersonType === "NATURAL") {
      setValue("code", "");
      setValue("legal_national_code", "");
      setValue("legal_register_no", "");
      setValue("legal_manager_name", "");
      setValue("legal_manager_family", "");
      setValue("legal_establishment_date", "");
    } else if (
      currentPersonType === "LEGAL" ||
      currentPersonType === "CIVIL_PARTICIPATE"
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
    } else if (currentPersonType === "FOREIGNER") {
      setValue("legal_national_code", "");
      setValue("legal_register_no", "");
      setValue("legal_manager_name", "");
      setValue("legal_manager_family", "");
      setValue("legal_establishment_date", "");
    }
  }, [currentPersonType, clearErrors, setValue]);

  useEffect(() => {
    handleTypeChange();
  }, [currentPersonType, handleTypeChange]);

  useEffect(() => {
    if (initialData) {
      const transformedData = transformInitialDataForForm(initialData);
      reset(transformedData);
    }
  }, [initialData, reset, transformInitialDataForForm]);

  const handleFormSubmit: SubmitHandler<CreatePersonDto> = async (data) => {

    let processedData: any = { ...data };

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

    processedData = ensureRequiredFields(processedData, currentPersonType);

    const fieldsToValidate = getFieldsToValidateByType(currentPersonType);
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid) {
      onSubmit(processedData);
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
            <Grid size={12}>
              <PersonTypeRadioGroup
                control={control}
                errors={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Divider sx={{ my: 2, width: "100%" }} />

            <BasicInfoFields
              personType={currentPersonType}
              control={control}
              errors={errors}
              isLoading={isLoading}
            />

            <TypeSpecificFields
              personType={currentPersonType}
              control={control}
              errors={errors}
              isLoading={isLoading}
            />

            <ContactInfoFields
              control={control}
              errors={errors}
              isLoading={isLoading}
            />

            <FormButtons
              isLoading={isLoading}
              hasInitialData={!!initialData}
              onCancel={onCancel}
            />
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default PersonForm;