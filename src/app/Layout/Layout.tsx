import { AxiosInterceptor, BasketProvider, ThemeProvider } from '@/features'
import { UserProvider } from '@/features/UserProvider'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/shared/components'
import { RenderHeader } from './RenderHeader'

export const Layout = () => (
  <ThemeProvider>
    <UserProvider>
      <BasketProvider>
        <AxiosInterceptor>
          <div className="wrapper">
            <RenderHeader />
            <main className="content">
              <div className="box">
                <Outlet />
              </div>
            </main>
            <Footer />
          </div>
        </AxiosInterceptor>
      </BasketProvider>
    </UserProvider>
  </ThemeProvider>
)
