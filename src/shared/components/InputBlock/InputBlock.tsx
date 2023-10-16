import classNames from 'classnames/bind'
import { ForwardedRef, forwardRef, InputHTMLAttributes, useId } from 'react'
import { Typography } from '@/shared/uikit'
import s from './styles.module.css'

type InputBlockType = 'row' | 'column'

export interface InputBlockProps {
  name: string
  field: InputHTMLAttributes<HTMLInputElement>
  error?: string
  constValue?: string
  blockType?: InputBlockType
}

const cx = classNames.bind(s)

export const InputBlock = forwardRef<HTMLInputElement, InputBlockProps>(
  (props: InputBlockProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, error, field, blockType = 'column', constValue = '' } = props
    const inputId = useId()

    return (
      <div className={s.wrapper}>
        <div className={cx({ block: true, [`${blockType}`]: true })}>
          <label className={cx({ t1: true, err1: !!error })} htmlFor={inputId}>
            {name}
          </label>
          {!!constValue && <span>{constValue}</span>}
          {!constValue && <input className={s.input} type="text" {...field} ref={ref} id={inputId} />}
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
