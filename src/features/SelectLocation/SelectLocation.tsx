import React from 'react'
import Select from 'react-select'
import { SelectAddressObject, useSelectLocation } from './useSelectLocation'

interface SelectLocationProps {
  addressObjects: SelectAddressObject[]
  setAddressObjects: React.Dispatch<React.SetStateAction<SelectAddressObject[]>>
}

export const SelectLocation = ({ addressObjects, setAddressObjects }: SelectLocationProps) => {
  const { onSelectChange } = useSelectLocation({ addressObjects, setAddressObjects })

  return (
    <div>
      {addressObjects?.map((select, index) => (
        <div key={index}>
          <span>{select.title}</span>
          <Select
            value={addressObjects[index].object}
            options={select.options}
            onChange={(newValue) => onSelectChange(newValue, index)}
          />
        </div>
      ))}
    </div>
  )
}
