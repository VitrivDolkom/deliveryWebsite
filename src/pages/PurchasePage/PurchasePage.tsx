import { SelectLocation } from '@/features'
import { ToastContainer } from 'react-toastify'
import { ButtonLoader, DishBasketCard, InputBlock } from '@/shared/components'
import { validations } from '@/shared/const'
import { Button, Typography } from '@/shared/uikit'
import { usePurchasePage } from './usePurchasePage'
import s from './styles.module.css'

export const PurchasePage = () => {
  const {
    profile,
    register,
    errors,
    addressObjects,
    setAddressObjects,
    basket,
    createOrderLoading,
    onFormSubmitWrapper
  } = usePurchasePage()

  return (
    <div className={s.wrapper}>
      <ToastContainer />
      <Typography tag="h1" variant="h1">
        Оформление заказа
      </Typography>
      <div className="block">
        <Typography tag="h2" variant="t6">
          Данные покупателя
        </Typography>
        <InputBlock label="Телефон" type="tel" blockType="row" constValue={profile?.phoneNumber} />
        <InputBlock label="Email" blockType="row" constValue={profile?.email} />
      </div>
      <div className="block">
        <Typography tag="h2" variant="t6">
          Данные доставки
        </Typography>
        <form>
          <InputBlock
            label="Время доставки"
            error={errors.deliveryTime?.message}
            type="datetime-local"
            {...register('deliveryTime', validations.deliveryTime)}
            ref={register('deliveryTime', validations.deliveryTime).ref}
          />

          <div className="addressBlock">
            <Typography variant="t1">Адрес доставки</Typography>
            <SelectLocation
              error={errors.addressId?.message}
              addressObjects={addressObjects}
              setAddressObjects={setAddressObjects}
            />
          </div>
        </form>
      </div>

      <div className="block">
        <Typography tag="h2" variant="t3">
          Список блюд
        </Typography>
        <div className="block">
          {basket?.map((dish) => <DishBasketCard key={dish.id} dish={dish} />)}
        </div>
      </div>

      <footer className="block">
        <Typography tag="p" variant="t4">
          Стоимость заказа:{' '}
          <Typography tag="span" variant="t1">
            {basket?.reduce((acc, dish) => acc + dish.totalPrice, 0)} руб.
          </Typography>
        </Typography>

        <Button
          styleType="solid"
          alertType="success"
          className="btn big block"
          onClick={onFormSubmitWrapper}
          isLoading={createOrderLoading}
          loader={<ButtonLoader />}
        >
          Подтвердить заказ
        </Button>
      </footer>
    </div>
  )
}
