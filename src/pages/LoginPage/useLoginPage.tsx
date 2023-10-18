import { loginRequest } from '@/shared/api'
import { useRequest } from '@/shared/lib/hooks'

export const useLoginPage = () => {
  const { requestHandler } = useRequest(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const api = (userInfo: LoginCredentials) => {
    requestHandler(loginRequest(userInfo))
  }

  return <div>useLoginPage</div>
}
