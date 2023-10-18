import { UserProvider } from '@/features/UserProvider'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/shared/components'
import { HeaderHOC } from './HeaderHOC'

export const Layout = () => (
  <UserProvider>
    <div className="wrapper">
      <HeaderHOC />
      <main className="content">
        <div className="box">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  </UserProvider>
)
