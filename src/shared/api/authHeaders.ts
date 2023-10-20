import { AxiosHeaderValue } from 'axios'

export const authHeaders = ({ token }: TokenResponse): { Authorization: AxiosHeaderValue } => ({
  Authorization: `Bearer ${token}`
})
