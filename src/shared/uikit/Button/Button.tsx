import classNames from 'classnames/bind'
import { ButtonHTMLAttributes } from 'react'
import s from './styles.module.css'

type ButtonStyleType = 'outlined' | 'solid'
type ButtonAlertType = 'success' | 'info' | 'danger' | 'primary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  styleType: ButtonStyleType
  alertType: ButtonAlertType
  loader?: React.ReactNode
}

const cx = classNames.bind(s)

export const Button = ({
  children,
  isLoading = false,
  styleType,
  alertType,
  loader,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    disabled={isLoading || props.disabled}
    className={`${props.className || ''} ${cx({
      btn: true,
      [`${styleType}`]: true,
      [`${alertType}`]: true
    })}`}
  >
    {!isLoading && children}
    {isLoading && loader}
  </button>
)
