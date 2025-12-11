import type { CreatePersonDto } from "../../types/person.types";

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

    // اطلاعات تماس
    default_phone: "",
    default_fax: "",
    default_mobile: "",
    default_address: "",
    default_email: "",
    default_website: "",
    default_bank_account: "",
  };
