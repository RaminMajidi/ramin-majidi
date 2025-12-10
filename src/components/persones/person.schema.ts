// person.schema.ts
import * as yup from "yup";
import type { PersonType } from "../../types/person.types";

export const getPersonSchema = (personType: PersonType) => {
  // Schema پایه برای همه انواع
  const baseSchema = yup.object().shape({
    typ: yup.string().required("نوع شخص الزامی است"),
    name: yup.string().required("نام الزامی است"),
    // اطلاعات تماس - برای همه انواع
    default_phone: yup.string().nullable(),
    default_mobile: yup
      .string()
      .nullable()
      .max(11, "موبایل باید حداکثر ۱۱ رقم باشد"),
    default_email: yup.string().nullable().email("ایمیل معتبر نیست"),
    default_address: yup.string().nullable(),
  });

  // Schema برای شخص حقیقی
  const naturalSchema = baseSchema.shape({
    code: yup.string().nullable(), // برای حقیقی، کد اختیاری است
    natural_family: yup.string().required("نام خانوادگی الزامی است"),
    natural_father_name: yup.string().nullable(),
    natural_national_code: yup
      .string()
      .nullable()
      .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
    natural_birth_date: yup.mixed().nullable(),
    natural_sex: yup.string().nullable(),
    is_internal_citizenship: yup.boolean().default(true),
    passport_number: yup.string().nullable(),
    citizen_code: yup.string().nullable(),
    citizen_nationality: yup.string().nullable(),
  });

  // Schema برای شخص حقوقی
  const legalSchema = baseSchema.shape({
    code: yup.string().required("کد الزامی است"),
    legal_national_code: yup.string().nullable(),
    legal_register_no: yup.string().nullable(),
    legal_establishment_date: yup.mixed().nullable(),
    legal_manager_name: yup.string().nullable(),
    legal_manager_family: yup.string().nullable(),
    economic_code: yup.string().nullable(),
    is_governmental: yup.boolean().default(false),
  });

  // Schema برای مشارکت مدنی
  const civilParticipateSchema = baseSchema.shape({
    code: yup.string().required("کد الزامی است"),
    legal_national_code: yup.string().nullable(),
    legal_register_no: yup.string().nullable(),
    legal_establishment_date: yup.mixed().nullable(),
    legal_manager_name: yup.string().nullable(),
    legal_manager_family: yup.string().nullable(),
  });

  // Schema برای اتباع خارجی
  const foreignerSchema = baseSchema.shape({
    code: yup.string().required("کد الزامی است"),
    passport_number: yup.string().required("شماره گذرنامه الزامی است"),
    citizen_code: yup.string().nullable(),
    citizen_nationality: yup.string().nullable(),
    natural_family: yup.string().nullable(),
    natural_father_name: yup.string().nullable(),
    natural_birth_date: yup.mixed().nullable(),
    is_internal_citizenship: yup.boolean().default(false),
  });

  // انتخاب schema بر اساس نوع شخص
  switch (personType) {
    case "NATURAL":
      return naturalSchema;
    case "LEGAL":
      return legalSchema;
    case "CIVIL_PARTICIPATE":
      return civilParticipateSchema;
    case "FOREIGNER":
      return foreignerSchema;
    default:
      return baseSchema;
  }
};
