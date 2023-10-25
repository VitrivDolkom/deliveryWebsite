import { SelectLocation } from '@/features'
import { DishBasketCard, InputBlock } from '@/shared/components'
import { validations } from '@/shared/const'
import { Typography } from '@/shared/uikit'
import { usePurchasePage } from './usePurchasePage'
import s from './styles.module.css'

export const PurchasePage = () => {
  const {
    profile,
    register,
    onFormSubmit,
    handleSubmit,
    errors,
    addressObjects,
    setAddressObjects,
    basket
  } = usePurchasePage()

  return (
    <div className={s.wrapper}>
      <Typography tag="h1" variant="h1">
        Оформление заказа
      </Typography>
      <div className={s.top}>
        <Typography tag="h2" variant="t6">
          Данные покупателя
        </Typography>
        <InputBlock label="Телефон" type="tel" blockType="row" constValue={profile?.email} />
        <InputBlock label="Email" blockType="row" constValue={profile?.phoneNumber} />
      </div>
      <div className={s.top}>
        <Typography tag="h2" variant="t6">
          Данные доставки
        </Typography>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <InputBlock
            label="Время доставки"
            error={errors.deliveryTime?.message}
            {...register('deliveryTime', validations.deliveryTime)}
            ref={register('deliveryTime', validations.deliveryTime).ref}
          />
          <SelectLocation addressObjects={addressObjects} setAddressObjects={setAddressObjects} />
        </form>
      </div>

      <div className="mt">
        <Typography tag="h2" variant="t3">
          Список блюд
        </Typography>
        {basket?.map((dish) => <DishBasketCard key={dish.id} dish={dish} />)}
      </div>
    </div>
  )
}
