import React from 'react'
import Select from 'react-select'
import { selectStyles } from '@/shared/const'
import { Typography } from '@/shared/uikit'
import { SelectAddress, SelectAddressObject, useSelectLocation } from './useSelectLocation'
import s from './styles.module.css'

interface SelectLocationProps {
  addressObjects: SelectAddressObject[]
  setAddressObjects: React.Dispatch<React.SetStateAction<SelectAddressObject[]>>
  error?: string
}

export const SelectLocation = ({ addressObjects, setAddressObjects, error }: SelectLocationProps) => {
  const { onSelectChange, onSelectClick } = useSelectLocation({ addressObjects, setAddressObjects })

  return (
    <div>
      {addressObjects?.map((select, index) => (
        <div key={index} className={s.item}>
          <Typography variant="t1">{select.title}</Typography>
          <Select
            value={addressObjects[index].object}
            options={select.options}
            onChange={(newValue) => onSelectChange(newValue, index)}
            onMenuOpen={() => onSelectClick(index - 1)}
            className="item"
            styles={selectStyles<SelectAddress>()}
          />
        </div>
      ))}
      {!!error && (
        <Typography tag="p" variant="err1">
          {error}
        </Typography>
      )}
    </div>
  )
}
