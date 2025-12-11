export type PersonType =
  | "NATURAL"
  | "LEGAL"
  | "FOREIGNER"
  | "CIVIL_PARTICIPATE";
export type SexType = "M" | "F" | null;
export type TtmsType = string | null;


export interface TPerson {
  // شناسه‌ها
  id: number;
  typ: PersonType;
  code: string;
  display_name: string;
  name: string;

  // اطلاعات اقتصادی
  economic_code?: string;
  economic_code_old?: string;
  ttms_buyer_type?: TtmsType;
  ttms_seller_type?: TtmsType;
  is_governmental: boolean;

  // اطلاعات حقیقی
  passport_number?: string;
  natural_family?: string;
  natural_father_name?: string;
  natural_national_code?: string;
  natural_birth_date?: string;
  natural_sex?: SexType;
  is_internal_citizenship?: boolean;
  citizen_code?: string;
  citizen_nationality?: string;

  // اطلاعات حقوقی
  legal_manager_name?: string;
  legal_manager_family?: string;
  legal_national_code?: string;
  legal_register_no?: string;
  legal_establishment_date?: string;

  // اطلاعات تماس
  // default_phone: string;
  // default_fax: string;
  // default_mobile: string;
  // default_address: string;
  // default_email: string;
  // default_website: string;
  // default_bank_account: string;

  // متا
  created_at?: string;
  updated_at?: string;
}

export interface CreatePersonDto {
  // شناسه‌ها
  typ: PersonType;
  code: string;
  name: string;
  display_name?: string;

  // اطلاعات اقتصادی
  economic_code?: string;
  economic_code_old?: string;
  ttms_buyer_type?: TtmsType;
  ttms_seller_type?: TtmsType;
  is_governmental: boolean;

  // اطلاعات حقیقی
  passport_number?: string;
  natural_family?: string;
  natural_father_name?: string;
  natural_national_code?: string;
  natural_birth_date?: string;
  natural_sex?: SexType;
  is_internal_citizenship?: boolean;
  citizen_code?: string;
  citizen_nationality?: string;

  // اطلاعات حقوقی
  legal_manager_name?: string;
  legal_manager_family?: string;
  legal_national_code?: string;
  legal_register_no?: string;
  legal_establishment_date?: string;

  // اطلاعات تماس
  // default_phone: string;
  // default_fax: string;
  // default_mobile: string;
  // default_address: string;
  // default_email: string;
  // default_website: string;
  // default_bank_account: string;
}

export interface UpdatePersonDto extends Partial<CreatePersonDto> {
  id: number;
}

export type TGetPersonsParams = {
  address?: string;
  city?: string;
  code?: number;
  country?: string;
  economic_code?: string;
  from_code?: number;
  full_name?: string;
  legal_manager_family?: string;
  legal_manager_name?: string;
  legal_national_code?: string;
  legal_register_no?: string;
  mobile?: number;
  natural_national_code?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  phone?: number;
  province?: number;
  to_code?: number;
  typ?: string;
};
