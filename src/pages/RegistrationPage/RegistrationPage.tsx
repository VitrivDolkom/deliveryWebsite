import { SelectLocation } from '@/features'
import Select from 'react-select'
import { ButtonLoader, InputBlock } from '@/shared/components'
import { validations } from '@/shared/const'
import { GenderEnum, genderOptions } from '@/shared/lib/const'
import { Button, Typography } from '@/shared/uikit'
import { useRegistrationPage } from './useRegistrationPage'
import './styles.css'

export const RegistrationPage = () => {
  const {
    setAddressObjects,
    addressObjects,
    error,
    errors,
    isLoading,
    register,
    setValue,
    watch,
    onFormSubmitWrapper
  } = useRegistrationPage()

  return (
    <div>
      <Typography tag="h1" variant="h1">
        Регистрация
      </Typography>
      <form className="form" onSubmit={onFormSubmitWrapper}>
        <InputBlock
          label="ФИО"
          error={errors.fullName?.message}
          {...register('fullName', validations.birthDate)}
          ref={register('fullName', validations.birthDate).ref}
        />

        <Typography tag="span" variant="t1">
          Пол
        </Typography>
        <Select
          options={genderOptions}
          value={{ label: GenderEnum[watch('gender')], value: watch('gender') }}
          onChange={(newValue) => setValue('gender', newValue?.value || 'Male')}
          className="item"
        />

        <InputBlock
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', validations.phone)}
          type="tel"
          label="Номер телефона"
          ref={register('phoneNumber', validations.phone).ref}
        />

        <InputBlock
          label="Дата рождения"
          error={errors.birthDate?.message}
          {...register('birthDate', validations.birthDate)}
          type="date"
          ref={register('birthDate', validations.birthDate).ref}
        />

        <div className="addressBlock">
          <Typography>Адрес проживания</Typography>
          <SelectLocation
            addressObjects={addressObjects}
            setAddressObjects={setAddressObjects}
            error={errors.addressId?.message}
          />
        </div>

        <InputBlock
          label="Email (будет использоваться для входа в систему)"
          error={errors.email?.message}
          {...register('email', validations.email)}
          ref={register('email', validations.email).ref}
        />

        <InputBlock
          label="Пароль"
          type="password"
          error={errors.password?.message}
          {...register('password', validations.password)}
          ref={register('password', validations.password).ref}
        />

        <Button styleType="solid" alertType="info" isLoading={isLoading} loader={<ButtonLoader />}>
          Зарегестрироваться
        </Button>

        {!!error && (
          <Typography tag="p" variant="err1">
            Ошибка создания пользователя
          </Typography>
        )}
      </form>
    </div>
  )
}
