import type { CreatePersonDto, PersonType } from "../../../types/person.types";


export   const defaultValues: CreatePersonDto = {
    typ: "NATURAL",
    code: "",
    name: "",
    display_name: "",

    // اطلاعات اقتصادی
    economic_code: "",
    economic_code_old: "",
    ttms_buyer_type: null,
    ttms_seller_type: null,
    is_governmental: false,

    // اطلاعات حقیقی
    passport_number: "",
    natural_family: "",
    natural_father_name: "",
    natural_national_code: "",
    natural_birth_date: undefined,
    natural_sex: null,
    is_internal_citizenship: true,
    citizen_code: "",
    citizen_nationality: "",

    // اطلاعات حقوقی
    legal_manager_name: "",
    legal_manager_family: "",
    legal_national_code: "",
    legal_register_no: "",
    legal_establishment_date: undefined,

  };


  export const personTypeObject: Record<PersonType, string> = {
    NATURAL: "حقیقی",
    LEGAL: "حقوقی",
    CIVIL_PARTICIPATE: "مشارکت مدنی",
    FOREIGNER: "خارجی",
  };