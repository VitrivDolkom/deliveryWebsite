import { StylesConfig } from 'react-select'

export const selectStyles = <T, M extends boolean = false>(): StylesConfig<T, M> => ({
  control: (base) => ({
    ...base,
    background: 'var(--neutral-10)'
  }),
  menuList: (base) => ({
    ...base,
    padding: 0
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? 'var(--neutral-30)' : 'var(--neutral-10)',
    color: 'var(--neutral-100)'
  }),
  multiValue: (base) => ({
    ...base,
    background: 'var(--neutral-50)'
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--neutral-100)'
  })
})
