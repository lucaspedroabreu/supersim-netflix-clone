import { useEffect, useState } from 'react'
import NetflixLogo from '../assets/netflix-logo.png'
import NetflixAvatar from '../assets/netflix-avatar.png'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  const transitionHeaderBg = () => {
    (window.scrollY > 100) ? setScrolled(true) : setScrolled(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionHeaderBg)
    return () => window.removeEventListener('scroll', transitionHeaderBg)
  }, [])

  return (
    <header id="header" className={`nav ${scrolled && "nav__scrolled"}`}>
      <div className="nav__contents">
        <img className='nav__logo' src={NetflixLogo} alt="Netflix" />
        <img className='nav__avatar' src={NetflixAvatar} alt="User avatar" />
      </div>
    </header>
  )
}
