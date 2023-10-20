import { SelectLocation } from '@/features'
import { ButtonLoader, InputBlock } from '@/shared/components'
import { validations } from '@/shared/const'
import { GenderEnum } from '@/shared/lib/const'
import { Button, Typography } from '@/shared/uikit'
import { useProfilePage } from './useProfilePage'

export const ProfilePage = () => {
  const {
    setAddressObjects,
    addressLoading,
    addressObjects,
    error,
    errors,
    handleSubmit,
    isLoading,
    onFormSubmit,
    register,
    watch
  } = useProfilePage()

  return (
    <div>
      <Typography tag="h1" variant="h1">
        Профиль
      </Typography>
      <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
        <InputBlock
          label="ФИО"
          blockType="row"
          error={errors.fullName?.message}
          {...register('fullName', validations.fullName)}
          ref={register('fullName', validations.fullName).ref}
        />

        <InputBlock
          label="Email"
          constValue={watch('email')}
          blockType="row"
          error={errors.email?.message}
          {...register('email', validations.email)}
          ref={register('email', validations.email).ref}
        />

        <InputBlock
          label="Дата рождения"
          blockType="row"
          type="date"
          error={errors.birthDate?.message}
          {...register('birthDate', validations.birthDate)}
          ref={register('birthDate', validations.birthDate).ref}
        />

        <InputBlock
          label="Пол"
          blockType="row"
          constValue={GenderEnum[watch('gender')] || GenderEnum.Male}
          error={errors.email?.message}
        />

        <InputBlock
          label="Телефон"
          type="tel"
          blockType="row"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', validations.phone)}
          ref={register('phoneNumber', validations.phone).ref}
        />

        <SelectLocation addressObjects={addressObjects} setAddressObjects={setAddressObjects} />

        <Button
          className="btn"
          styleType="solid"
          alertType="info"
          isLoading={isLoading || addressLoading}
          loader={<ButtonLoader />}
        >
          Обновить
        </Button>

        {!!error && (
          <Typography tag="p" variant="err1">
            {error}
          </Typography>
        )}
      </form>
    </div>
  )
}
