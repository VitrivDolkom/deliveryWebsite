import { useParams } from 'react-router-dom'
import { getDishConfig, getRatingCheckConfig, postRatingConfig } from '@/shared/api'
import { useUserContext } from '@/shared/lib/contexts'
import { useRequest } from '@/shared/lib/hooks'

export const useMenuDishPage = () => {
  const { id } = useParams()
  const { user } = useUserContext()

  const { data: dish, isLoading } = useRequest({
    onMount: true,
    config: getDishConfig({ id: id || '' })
  })

  const { data: availableRating } = useRequest({
    onMount: true,
    config: getRatingCheckConfig({ id: id || '', token: { token: user.token } })
  })

  const { isLoading: ratingLoading, error: ratingError, requestHandler: postRating } = useRequest({})

  const onRatingClick = (ratingScore: number) => {
    if (!availableRating) return

    postRating(postRatingConfig({ id: id || '', token: { token: user.token }, ratingScore }))
  }

  return { dish, isLoading, availableRating, ratingLoading, ratingError, onRatingClick }
}
