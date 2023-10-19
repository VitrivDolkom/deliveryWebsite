import classNames from 'classnames/bind'
import { ForwardedRef, forwardRef, InputHTMLAttributes, useId } from 'react'
import { getValidatedPhoneNumber } from '@/shared/lib/helpers'
import { Typography } from '@/shared/uikit'
import s from './styles.module.css'

type InputBlockType = 'row' | 'column'

export interface InputBlockProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  constValue?: string
  blockType?: InputBlockType
}

const cx = classNames.bind(s)

export const InputBlock = forwardRef<HTMLInputElement, InputBlockProps>(
  (props: InputBlockProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { label, error, blockType = 'column', constValue = '' } = props
    const inputId = useId()

    const telOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.currentTarget.value = getValidatedPhoneNumber(
        e.currentTarget.value,
        e.currentTarget.selectionStart
      )

      if (props.onChange) {
        props.onChange(e)
      }
    }

    return (
      <div className={s.wrapper}>
        <div className={cx({ block: true, [`${blockType}`]: true })}>
          <label htmlFor={inputId}>
            <Typography tag="span" variant="t1">
              {label}
            </Typography>
          </label>
          {!!constValue && <span>{constValue}</span>}
          {!constValue && (
            <input
              className={s.input}
              {...props}
              onChange={props.type === 'tel' ? telOnChange : props.onChange}
              ref={ref}
              id={inputId}
            />
          )}
        </div>
        {!!error && (
          <Typography tag="span" variant="err1" className={s.errorMessage}>
            {error}
          </Typography>
        )}
      </div>
    )
  }
)
