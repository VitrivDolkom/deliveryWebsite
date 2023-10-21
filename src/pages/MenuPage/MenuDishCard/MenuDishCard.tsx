import { Button, Typography } from '@/shared/uikit'
import s from './styles.module.css'

interface MenuDishCardProps {
  dish: DishDto
}

export const MenuDishCard = ({ dish }: MenuDishCardProps) => (
  <div className={s.card}>
    <div className={s.img}>
      <img src={dish.image} alt="Картинка блюда" />
    </div>
    <div className={s.top}>
      <Typography tag="h2" variant="t3" className={s.name}>
        {dish.name}
      </Typography>
      <Typography tag="p" variant="t1">
        Категория блюда - {dish.category}
      </Typography>
    </div>
    <main className={s.content}>
      <div className="rate"></div>
      <Typography tag="p" variant="t1">
        {dish.description}
      </Typography>
    </main>
    <footer className={s.footer}>
      <Typography tag="p" variant="t1">
        Цена - {dish.price}р
      </Typography>
      <Button styleType="solid" alertType="success" className="btn">
        В корзину
      </Button>
    </footer>
  </div>
)
