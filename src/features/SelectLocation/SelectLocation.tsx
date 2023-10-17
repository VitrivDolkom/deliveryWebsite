import { useFieldArray, useForm } from 'react-hook-form'
import { useRequest } from '@/shared/lib/hooks'

export const SelectLocation = () => {
  const { register, control, handleSubmit, formState, setValue } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'test'
  })

  const { data, error, isLoading } = useRequest<DishPagedListDto>(true, {
    method: 'get',
    url: 'https://food-delivery.kreosoft.ru/api/dish',
    headers: {}
  })

  // useEffect(() => {
  //   requestHandler()
  // }, [])

  if (isLoading) {
    return <div>Loading</div>
  }

  return <div></div>
}
