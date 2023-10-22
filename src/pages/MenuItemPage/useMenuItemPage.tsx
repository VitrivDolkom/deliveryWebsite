import { useParams } from 'react-router-dom'
import { getDishConfig, getRatingCheckConfig, postRatingConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useMenuItemPage = () => {
  const { id } = useParams()
  const { user } = useUserContext()

  const { data: dish, isLoading } = useRequest<DishDto>({
    onMount: true,
    config: getDishConfig({ id: id || '' })
  })

  const { data: availableRating } = useRequest<boolean>({
    onMount: true,
    config: getRatingCheckConfig({ id: id || '', token: { token: user.token } })
  })

  const {
    isLoading: ratingLoading,
    error: ratingError,
    isSuccess: successRating,
    requestHandler: postRating
  } = useRequest<never>({})

  const onRatingClick = (ratingScore: number) => {
    postRating(postRatingConfig({ id: id || '', token: { token: user.token }, ratingScore }))
  }

  return {
    dish,
    isLoading,
    availableRating,
    ratingLoading,
    ratingError,
    onRatingClick,
    successRating
  }
}
