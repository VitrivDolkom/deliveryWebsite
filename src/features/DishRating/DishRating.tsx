import emptyStar from '@/assets/icons/emptyStar.png'
import fullStar from '@/assets/icons/fullStar.png'
import halfStar from '@/assets/icons/halfStar.png'
import s from './style.module.css'

interface DishRatingProps {
  rating: number
}
type StarType = 'full' | 'empty' | 'half'
const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const DishRating = ({ rating }: DishRatingProps) => (
  <div className={s.list}>
    {stars.map((index) => {
      let starType: StarType = 'full'

      if (rating > index - 0.25) {
        starType = 'full'
      } else if (rating > index - 0.5) {
        starType = 'half'
      } else {
        starType = 'empty'
      }

      return (
        <div key={index} className={s.img}>
          {starType === 'empty' && <img src={emptyStar} alt="" />}
          {starType === 'full' && <img src={fullStar} alt="" />}
          {starType === 'half' && <img src={halfStar} alt="" />}
        </div>
      )
    })}
  </div>
)
