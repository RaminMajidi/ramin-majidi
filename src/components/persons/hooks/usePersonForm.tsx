import { useCallback } from "react";
import type { CreatePersonDto, TPerson } from "../../../types/person.types";

const usePersonForm = () => {
  const formatDateForBackend = useCallback((date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const transformInitialDataForForm = useCallback(
    (data: TPerson): CreatePersonDto => {
      return {
        ...data,
        // اطمینان از اینکه همه فیلدها مقدار default داشته باشند
        typ: data.typ || "NATURAL",
        code: data.code || "",
        name: data.name || "",
        display_name: data.display_name || "",
        economic_code: data.economic_code || "",
        economic_code_old: data.economic_code_old || "",
        ttms_buyer_type: data.ttms_buyer_type || null,
        ttms_seller_type: data.ttms_seller_type || null,
        is_governmental: data.is_governmental || false,
        passport_number: data.passport_number || "",
        natural_family: data.natural_family || "",
        natural_father_name: data.natural_father_name || "",
        natural_national_code: data.natural_national_code || "",
        natural_birth_date: data.natural_birth_date
          ? typeof data.natural_birth_date === "string"
            ? data.natural_birth_date
            : formatDateForBackend(data.natural_birth_date)
          : "",
        natural_sex: data.natural_sex || null,
        is_internal_citizenship: data.is_internal_citizenship ?? true,
        citizen_code: data.citizen_code || "",
        citizen_nationality: data.citizen_nationality || "",
        legal_manager_name: data.legal_manager_name || "",
        legal_manager_family: data.legal_manager_family || "",
        legal_national_code: data.legal_national_code || "",
        legal_register_no: data.legal_register_no || "",
        legal_establishment_date: data.legal_establishment_date
          ? typeof data.legal_establishment_date === "string"
            ? data.legal_establishment_date
            : formatDateForBackend(data.legal_establishment_date)
          : "",
        default_phone: data.default_phone || "",
        default_fax: data.default_fax || "",
        default_mobile: data.default_mobile || "",
        default_address: data.default_address || "",
        default_email: data.default_email || "",
        default_website: data.default_website || "",
        default_bank_account: data.default_bank_account || "",
      };
    },
    [formatDateForBackend]
  ); // فقط وابسته به formatDateForBackend

  return { transformInitialDataForForm, formatDateForBackend };
};

export default usePersonForm;
