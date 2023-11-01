import classNames from 'classnames/bind'
import emptyStar from '@/assets/icons/emptyStar.png'
import fullStar from '@/assets/icons/fullStar.png'
import halfStar from '@/assets/icons/halfStar.png'
import s from './style.module.css'

const cx = classNames.bind(s)

interface DishRatingProps {
  rating: number
  size: 'xs' | 's'
  onRatingClick?: (ratingScore: number) => void
}

type StarType = 'full' | 'empty' | 'half'
const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const DishRating = ({ rating, size, onRatingClick }: DishRatingProps) => (
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
        <div
          key={index}
          className={cx({ img: true, [`${size}`]: true })}
          onClick={() => onRatingClick?.(index)}
        >
          {starType === 'empty' && <img src={emptyStar} alt="" />}
          {starType === 'full' && <img src={fullStar} alt="" />}
          {starType === 'half' && <img src={halfStar} alt="" />}
        </div>
      )
    })}
  </div>
)
