import classNames from 'classnames/bind'
import s from './style.module.css'

const cx = classNames.bind(s)

interface ButtonLoaderProps {
  color?: 'white' | 'default'
}

export const ButtonLoader = ({ color = 'default' }: ButtonLoaderProps) => (
  <div className={cx({ loader: true, [`${color}`]: true })}></div>
)
