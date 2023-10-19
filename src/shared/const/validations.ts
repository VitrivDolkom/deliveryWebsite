interface InputValidations {
  fullName: Validation
  phone: Validation
  email: Validation
  birthDate: Validation
  orderTime: Validation
  password: Validation
}

interface Validation {
  required: { value: boolean; message: string }
  maxLength?: { value: number; message: string }
  minLength?: { value: number; message: string }
  pattern?: { value: RegExp; message: string }
}

export const validations: InputValidations = {
  fullName: {
    required: { value: true, message: 'Заполните поле' },
    maxLength: { value: 30, message: 'Длина от 2 до 30' },
    minLength: { value: 2, message: 'Длина от 2 до 30' },
    pattern: { value: /^[A-Za-z]+\s[A-Za-z]+\s[A-Za-z]+$/, message: 'Некорректное имя' }
  },
  phone: {
    required: { value: true, message: 'Заполните поле' },
    maxLength: { value: 16, message: 'Длина 11' },
    pattern: { value: /^(\+7) [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}/, message: 'Некорректный телефон' }
  },
  email: {
    required: { value: true, message: 'Заполните поле' },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Некорректный email'
    }
  },
  birthDate: {
    required: { value: true, message: 'Заполните поле' }
  },
  orderTime: {
    required: { value: true, message: 'Заполните поле' }
  },
  password: {
    required: { value: true, message: 'Заполните поле' },
    minLength: { value: 6, message: 'Минимальная длина 6 символов' }
  }
}
