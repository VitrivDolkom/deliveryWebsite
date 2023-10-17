import React from 'react'
import Select, { SingleValue } from 'react-select'
import { useRequest } from '@/shared/lib/hooks'

const backendUrl = 'https://food-delivery.kreosoft.ru/api'

interface SelectAddress {
  address: SearchAddressModel
  value: string
  label: string
}
interface SelectObject {
  options: SelectAddress[]
  object: SelectAddress | null
  title: string
}

export const SelectLocation = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectObject[]>([])
  const { data: addressSearch, requestHandler: searchRequest } = useRequest<SearchAddressModel[]>(false)

  React.useEffect(() => {
    searchRequest({
      method: 'get',
      url: `${backendUrl}/address/search`,
      headers: {}
    })
  }, [])

  React.useEffect(() => {
    if (!addressSearch || !addressSearch.length) return

    setAddressObjects((prev) => [
      ...prev,
      {
        object: null,
        options: addressSearch.map((address) => ({ address, value: address.text, label: address.text })),
        title: addressSearch[0].objectLevelText
      }
    ])
  }, [addressSearch])

  const onSelectChange = (newValue: SingleValue<SelectAddress>, index: number) => {
    setAddressObjects((prev) => {
      prev[index] = {
        object: newValue,
        options: prev[index].options,
        title: prev[index].title
      }

      prev.splice(index + 1)

      const url = `${backendUrl}/address/search?parentObjectId=${prev[index].object?.address.objectId}&query=`

      searchRequest({
        method: 'get',
        url: url,
        headers: {}
      })

      return [...prev]
    })
  }

  return (
    <div>
      {addressObjects?.map((select, index) => (
        <div key={index}>
          <span>{select.title}</span>
          <Select
            value={addressObjects[index].object}
            options={select.options}
            onChange={(newValue: SingleValue<SelectAddress>) => onSelectChange(newValue, index)}
          />
        </div>
      ))}
    </div>
  )
}
