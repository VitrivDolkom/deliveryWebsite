import { SelectAddress, SelectAddressObject } from './useSelectLocation'

export const selectAddressObjectFromSearchModel = (
  addressSearch: SearchAddressModel[],
  setDefault: boolean = false
): SelectAddressObject => {
  const defaultObject = setDefault
    ? {
        address: addressSearch[0],
        value: addressSearch[0].text,
        label: addressSearch[0].text
      }
    : null

  return {
    object: defaultObject,
    options: addressSearch.map((address) => ({ address, value: address.text, label: address.text })),
    title: addressSearch[0].objectLevelText
  }
}

export const selectAddressFromSearchModel = (addressSearch: SearchAddressModel[]): SelectAddress[] =>
  addressSearch.map((address) => ({ address: address, label: address.text, value: address.text }))
