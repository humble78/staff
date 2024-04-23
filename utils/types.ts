export interface PassportDetails {
  last_name: string,
  first_name: string,
  middle_name: string,
  date_birth: string,
  gender: string,
  series_and_number: string,
  pinfl: string,
}

export interface ContactDetails {
  main_phone: string,
  additional_phone: string,
  email: string,
  latitude: number,
  longitude: number,
  region: string,
  district: string,
  mahalla: string,
  street: string,
  apartment: string,
}

export interface Employee {
  // work_experiences: any[]
  // avatar: any
  first_name: string,
  last_name: string,
  middle_name: string,
  birth_date: string,
  series_and_number: string,
  pinfl: string,
  gender: string,
  main_phone: string,
  additional_phone: string,
  email: string,
  latitude: number,
  longitude: number,
  district: string,
  region: string,
  mahalla: string,
  street: string,
  apartment: string,
  salary: number,
  department: string,
}
