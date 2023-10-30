import classNames from 'classnames/bind'
import s from './style.module.css'

const cx = classNames.bind(s)

interface HeaderProps {
  renderNavbar: () => JSX.Element
  renderUserActions: () => JSX.Element
  activeNav: boolean
  toggleActiveNav: () => void
}

export const Header = ({ renderNavbar, renderUserActions, activeNav, toggleActiveNav }: HeaderProps) => (
  <header className={s.header}>
    <div className={cx({ burger: true, active: activeNav })} onClick={toggleActiveNav}>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div className={cx({ nav: true, active: activeNav })}>
      <div className={s.left}>{renderNavbar?.()}</div>
      <div className={s.right}>{renderUserActions?.()}</div>
    </div>
  </header>
)
