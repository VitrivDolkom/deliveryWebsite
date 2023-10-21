import { Button, Typography } from '@/shared/uikit'
import s from './styles.module.css'

interface PaginationProps {
  pagination: PageInfoModel
  onPageChange: (page: number) => void
}

const shifts = [-1, 0, 1]

export const Pagination = ({ pagination, onPageChange }: PaginationProps) => (
  <div className={s.wrapper}>
    <Button
      className={s.btn}
      styleType="outlined"
      alertType="info"
      onClick={() => onPageChange(pagination.current - 1)}
    >
      «
    </Button>
    {shifts.map((shift) => {
      const currentPage = pagination.current + shift
      if (!currentPage) return null

      return (
        <Button
          key={currentPage}
          className={s.btn}
          styleType={pagination.current === currentPage ? 'solid' : 'outlined'}
          alertType="info"
          onClick={() => onPageChange(currentPage)}
        >
          {currentPage}
        </Button>
      )
    })}
    {pagination.current < pagination.count - 2 && (
      <Typography tag="div" variant="h1">
        ...
      </Typography>
    )}
    {pagination.current < pagination.count - 1 && (
      <Button
        className={s.btn}
        styleType={pagination.current === pagination.count ? 'solid' : 'outlined'}
        alertType="info"
      >
        {pagination.count}
      </Button>
    )}

    <Button
      className={s.btn}
      styleType="outlined"
      alertType="info"
      onClick={() => onPageChange(pagination.current + 1)}
    >
      »
    </Button>
  </div>
)
