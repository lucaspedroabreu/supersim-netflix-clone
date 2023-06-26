import { useEffect, useState } from 'react'
import NetflixLogo from '../assets/netflix-logo.png'
import NetflixAvatar from '../assets/netflix-avatar.png'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  const loggedUser = auth.currentUser

  const transitionHeaderBg = () => {
    (window.scrollY > 100) ? setScrolled(true) : setScrolled(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionHeaderBg)
    return () => window.removeEventListener('scroll', transitionHeaderBg)
  }, [loggedUser])

  return (
    <header id="header" className={`nav ${scrolled && "nav__scrolled"}`}>
      <div className="nav__contents">
        <img className='nav__logo' src={NetflixLogo} alt="Netflix" />
        <img onClick={() => signOut(auth)} className='nav__avatar' src={NetflixAvatar} alt="User avatar" />
      </div>
    </header>
  )
}
