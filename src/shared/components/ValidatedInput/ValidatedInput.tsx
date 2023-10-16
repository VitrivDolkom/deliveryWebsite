import { ForwardedRef, forwardRef, InputHTMLAttributes, useId } from 'react'
import s from './styles.module.css'

export interface ValidatedInputProps {
  name: string
  error?: string
  field: InputHTMLAttributes<HTMLInputElement>
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  (props: ValidatedInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, error, field } = props
    const inputId = useId()

    return (
      <div className={s.wrapper}>
        <label className={[s.label, !!error && s.error].join(' ')} htmlFor={inputId}>
          {name}
        </label>
        <input className={s.input} type="text" {...field} ref={ref} id={inputId} />
        {!!error && <span className={s.errorMessage}>{error}</span>}
      </div>
    )
  }
)
