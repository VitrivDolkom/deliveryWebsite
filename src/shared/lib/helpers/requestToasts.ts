import { toast } from 'react-toastify'

export const toastOnSuccessRequest = (message?: string) => {
  toast.success(message || 'Обновление успешно', { autoClose: 2000 })
}

export const toastOnErrorRequest = (error: string) => {
  toast.error(error, { autoClose: false })
}
