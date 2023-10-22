import React from 'react'
import { SingleValue } from 'react-select'
import { addressSearchRequest } from '@/shared/api'
import { useRequest } from '@/shared/lib/hooks'
import { selectAddressFromSearchModel, selectAddressObjectFromSearchModel } from './helpers'

export interface SelectAddressObject {
  options: SelectAddress[]
  object: SelectAddress | null
  title: string
}

export interface SelectAddress {
  address: SearchAddressModel
  value: string
  label: string
}

interface UseSelectLocationParams {
  addressObjects: SelectAddressObject[]
  setAddressObjects: React.Dispatch<React.SetStateAction<SelectAddressObject[]>>
}

export const useSelectLocation = ({ addressObjects, setAddressObjects }: UseSelectLocationParams) => {
  const { data: addressSearch, requestHandler: fetchAddressSearch } =
    useRequest<SearchAddressModel[]>(false)
  const { data: singleAddressSearch, requestHandler: fetchSingleAddressSearch } =
    useRequest<SearchAddressModel[]>(false)

  React.useEffect(() => {
    fetchAddressSearch(addressSearchRequest({}))
  }, [])

  React.useEffect(() => {
    if (!addressSearch || !addressSearch.length) return

    setAddressObjects((prev) => [...prev, selectAddressObjectFromSearchModel(addressSearch)])
  }, [addressSearch])

  React.useEffect(() => {
    if (!singleAddressSearch || !singleAddressSearch.length) return

    let index = 0

    for (let i = 0; i < addressObjects.length; i++) {
      const addressObject = addressObjects[i]
      const found = singleAddressSearch.some(
        (address) => address.objectId === addressObject.object?.address.objectId
      )

      if (found) {
        index = i
      }
    }

    setAddressObjects((prev) => {
      const copy = [...prev]

      const newOptions = selectAddressFromSearchModel(singleAddressSearch)
      copy[index] = { ...copy[index], options: newOptions }

      return copy
    })
  }, [singleAddressSearch])

  const onSelectClick = (index: number) => {
    if (index < 0) return

    fetchSingleAddressSearch(
      addressSearchRequest({
        parentObjectId: addressObjects[index].object?.address.objectId,
        query: ''
      })
    )
  }

  const onSelectChange = (newValue: SingleValue<SelectAddress>, index: number) => {
    setAddressObjects((prev) => {
      const copy = [...prev]

      copy[index] = {
        object: newValue,
        options: copy[index].options,
        title: copy[index].title
      }

      copy.splice(index + 1)

      fetchAddressSearch(
        addressSearchRequest({
          parentObjectId: newValue?.address.objectId,
          query: ''
        })
      )

      return copy
    })
  }

  return { addressObjects, onSelectChange, onSelectClick }
}
