export enum GenderEnum {
  Male = 'Мужчина',
  Female = 'Женщина'
}

export const genderOptions: { label: GenderEnum; value: Gender }[] = [
  { label: GenderEnum.Male, value: 'Male' },
  { label: GenderEnum.Female, value: 'Female' }
]
