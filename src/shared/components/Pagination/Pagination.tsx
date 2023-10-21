import { Button } from '@/shared/uikit'
import s from './styles.module.css'

interface PaginationProps {
  pagination: PageInfoModel
}

const shifts = [-1, 0, 1]

export const Pagination = ({ pagination }: PaginationProps) => (
  <div className={s.wrapper}>
    <Button className={s.btn} styleType="outlined" alertType="info">
      «
    </Button>
    {shifts.map((shift) => {
      const currentPage = pagination.current + shift
      if (!currentPage) return null

      return (
        <Button
          className={s.btn}
          styleType={pagination.current === currentPage ? 'solid' : 'outlined'}
          alertType="info"
        >
          {currentPage}
        </Button>
      )
    })}
    <Button className={s.btn} styleType="outlined" alertType="info">
      »
    </Button>
  </div>
)
