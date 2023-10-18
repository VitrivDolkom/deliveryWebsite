import React from 'react'
import { SingleValue } from 'react-select'
import { addressSearchRequest } from '@/shared/api'
import { useRequest } from '@/shared/lib/hooks'

interface SelectAddress {
  address: SearchAddressModel
  value: string
  label: string
}

interface SelectAddressObject {
  options: SelectAddress[]
  object: SelectAddress | null
  title: string
}

export const useSelectLocation = () => {
  const [addressObjects, setAddressObjects] = React.useState<SelectAddressObject[]>([])
  const { data: addressSearch, requestHandler: fetchAddressSearch } =
    useRequest<SearchAddressModel[]>(false)

  React.useEffect(() => {
    fetchAddressSearch(addressSearchRequest({}))
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

      fetchAddressSearch(
        addressSearchRequest({
          parentObjectId: prev[index].object?.address.objectId,
          query: ''
        })
      )

      return [...prev]
    })
  }

  return { addressObjects, onSelectChange }
}