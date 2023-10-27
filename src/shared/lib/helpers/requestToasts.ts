import { toast } from 'react-toastify'

export const toastOnSuccessRequest = () => {
  toast.success('Обновление успешно', { autoClose: 2000 })
}

export const toastOnErrorRequest = (error: string) => {
  toast.error(error)
}
