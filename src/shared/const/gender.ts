export enum GenderEnum {
  Male = 'Мужчина',
  Female = 'Женщина'
}

export interface GenderOption {
  label: GenderEnum
  value: Gender
}

export const genderOptions: GenderOption[] = [
  { label: GenderEnum.Male, value: 'Male' },
  { label: GenderEnum.Female, value: 'Female' }
]
