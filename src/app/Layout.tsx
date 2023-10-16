import { Outlet } from 'react-router-dom'
import { Footer, Header } from '@/shared/components'

export const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
)
