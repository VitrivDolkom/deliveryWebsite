import { ReactNode } from 'react'

export interface TypographyProps {
  children?: ReactNode
  className?: string
  variant?:
    | 't1'
    | 't2'
    | 't3'
    | 't4'
    | 't5'
    | 'sub1'
    | 'sub2'
    | 'btn1'
    | 'btn2'
    | 'err1'
    | 'err2'
    | 'h1'
    | 'h2'
  tag?: keyof JSX.IntrinsicElements
}

export const Typography = ({
  children,
  variant = 't1',
  className = '',
  tag: Wrapper = 'div',
  ...props
}: TypographyProps) => (
  <Wrapper className={`${variant} ${className}`} {...props}>
    {children}
  </Wrapper>
)
