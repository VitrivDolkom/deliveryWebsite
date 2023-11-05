export const parseFormResponseErrors = <T>(errors: FormErrorResponse<T>['errors']): FormError<T>[] =>
  Object.entries(errors).map(([key, value]) => ({
    field: (key.charAt(0).toLowerCase() + key.slice(1)) as keyof T,
    message: value.join(', ')
  }))
