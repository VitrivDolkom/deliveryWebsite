import s from './style.module.css'

interface HeaderProps {
  renderNavbar: () => JSX.Element
  renderUserActions: () => JSX.Element
}

export const Header = ({ renderNavbar, renderUserActions }: HeaderProps) => (
  <header className={s.header}>
    <nav className={s.left}>{renderNavbar?.()}</nav>
    <div className={s.right}>{renderUserActions?.()}</div>
  </header>
)
