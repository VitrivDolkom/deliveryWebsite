import { BasketProvider } from '@/features'
import { UserProvider } from '@/features/UserProvider'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/shared/components'
import { RenderHeader } from './RenderHeader'

export const Layout = () => (
  <UserProvider>
    <BasketProvider>
      <div className="wrapper">
        <RenderHeader />
        <main className="content">
          <div className="box">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </BasketProvider>
  </UserProvider>
)
