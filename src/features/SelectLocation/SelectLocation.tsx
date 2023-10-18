import Select from 'react-select'
import { useSelectLocation } from './useSelectLocation'

export const SelectLocation = () => {
  const { addressObjects, onSelectChange } = useSelectLocation()

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
