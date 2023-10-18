import { Outlet } from 'react-router-dom'
import { Footer } from '@/shared/components'
import { HeaderHOC } from './HeaderHOC'

export const Layout = () => (
  <div className="wrapper">
    <HeaderHOC />
    <div className="box">
      <Outlet />
    </div>
    <Footer />
  </div>
)
