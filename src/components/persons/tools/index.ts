import type { CreatePersonDto } from "../../../types/person.types";

export const parseDate = (value: any): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
};

export const ensureRequiredFields = (
  data: any,
  type: CreatePersonDto["typ"]
): CreatePersonDto => {
  const result = { ...data };

  // برای فیلدهایی که مربوط به نوع فعلی نیستند، null ارسال کن
  if (type === "NATURAL") {
    // برای NATURAL، فیلدهای مربوط به LEGAL و FOREIGNER را null بفرست
    result.passport_number = null;
    result.citizen_code = null;
    result.citizen_nationality = null;
    result.legal_national_code = null;
    result.legal_register_no = null;
    result.legal_manager_name = null;
    result.legal_manager_family = null;
    result.legal_establishment_date = null;
  } else if (type === "LEGAL") {
    // برای LEGAL، فیلدهای مربوط به NATURAL و FOREIGNER را null بفرست
    result.passport_number = null;
    result.citizen_code = null;
    result.citizen_nationality = null;
    result.natural_family = null;
    result.natural_father_name = null;
    result.natural_national_code = null;
    result.natural_birth_date = null;
    result.natural_sex = null;
  } else if (type === "FOREIGNER") {
    // برای FOREIGNER، فیلدهای مربوط به LEGAL را null بفرست
    result.legal_national_code = null;
    result.legal_register_no = null;
    result.legal_manager_name = null;
    result.legal_manager_family = null;
    result.legal_establishment_date = null;
  }

  // برای فیلدهای تاریخ - اگر empty string هستند، به null تبدیل کن
  if (result.natural_birth_date === "") {
    result.natural_birth_date = null;
  }

  if (result.legal_establishment_date === "") {
    result.legal_establishment_date = null;
  }

  // اطمینان از اینکه فیلدهای optional خالی، empty string باشند
  result.display_name = data.display_name || "";
  result.default_fax = data.default_fax || "";
  result.default_website = data.default_website || "";
  result.default_bank_account = data.default_bank_account || "";
  result.economic_code = data.economic_code || "";
  result.economic_code_old = data.economic_code_old || "";

  // تبدیل boolean
  result.is_internal_citizenship = Boolean(data.is_internal_citizenship);
  result.is_governmental = Boolean(data.is_governmental);

  // برای فیلدهای nullable
  result.ttms_buyer_type = data.ttms_buyer_type || null;
  result.ttms_seller_type = data.ttms_seller_type || null;

  return result;
};

// لیست فیلدهایی که باید برای هر نوع validate شوند
export const getFieldsToValidateByType = (
  type: CreatePersonDto["typ"]
): (keyof CreatePersonDto)[] => {
  const baseFields: (keyof CreatePersonDto)[] = ["typ", "name"];

  switch (type) {
    case "NATURAL":
      return [...baseFields, "natural_family"];
    case "LEGAL":
      return [...baseFields, "code"];
    case "FOREIGNER":
      return [...baseFields, "code", "passport_number"];
    case "CIVIL_PARTICIPATE":
      return [...baseFields, "code"];
    default:
      return baseFields;
  }
};
