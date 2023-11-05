import { SelectLocation } from '@/features'
import { ToastContainer } from 'react-toastify'
import { ButtonLoader, InputBlock } from '@/shared/components'
import { GenderEnum, validations } from '@/shared/const'
import { Button, Typography } from '@/shared/uikit'
import { useProfilePage } from './useProfilePage'

export const ProfilePage = () => {
  const {
    setAddressObjects,
    addressLoading,
    updateProfileLoading,
    updateProfileError,
    addressObjects,
    error,
    errors,
    isLoading,
    userInfo,
    register,
    onFormSubmitWrapper
  } = useProfilePage()

  return (
    <div>
      <ToastContainer />
      <Typography tag="h1" variant="h1">
        Профиль
      </Typography>
      <form className="form" onSubmit={onFormSubmitWrapper}>
        <InputBlock
          label="ФИО"
          blockType="row"
          error={errors.fullName?.message}
          {...register('fullName', validations.fullName)}
          ref={register('fullName', validations.fullName).ref}
        />

        <InputBlock label="Email" constValue={userInfo?.email} blockType="row" />

        <InputBlock
          label="Дата рождения"
          blockType="row"
          type="date"
          error={errors.birthDate?.message}
          {...register('birthDate', validations.birthDate)}
          ref={register('birthDate', validations.birthDate).ref}
        />

        <InputBlock label="Пол" blockType="row" constValue={GenderEnum[userInfo?.gender || 'Male']} />

        <InputBlock
          label="Телефон"
          type="tel"
          blockType="row"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', validations.phone)}
          ref={register('phoneNumber', validations.phone).ref}
        />

        <div className="addressBlock">
          <Typography>Адрес проживания</Typography>
          <SelectLocation
            error={errors.addressId?.message}
            addressObjects={addressObjects}
            setAddressObjects={setAddressObjects}
          />
        </div>

        <Button
          className="btn"
          styleType="solid"
          alertType="info"
          isLoading={isLoading || addressLoading || updateProfileLoading}
          loader={<ButtonLoader />}
        >
          Обновить
        </Button>

        {!!error && (
          <Typography tag="p" variant="err1">
            Ошибка получения профиля
          </Typography>
        )}
        {!!updateProfileError && (
          <Typography tag="p" variant="err1">
            Ошибка обновления профиля, проверьте корректность выбора адреса и введенных данных
          </Typography>
        )}
      </form>
    </div>
  )
}
