import { useState } from 'react'
import NetflixLogo from '../assets/netflix-logo.png'
import {CTAComponent} from '../components/CTAComponent'
import { AuthComponent } from '../components/AuthComponent'

export function Login() {
  const [authComponent, setAuthComponent] = useState(false)
  const [signUpEmail, setSignUpEmail] = useState("")

  function handleSignUp(email: string) {
    setSignUpEmail(email)
    setAuthComponent(true)
  }

  return (
    <div className="login-screen relative h-screen w-full">
      <div className="login-screen__background ">
        <img src={NetflixLogo} alt="" className='login-screen__logo fixed left-0 w-40 object-contain pl-5 hover:brightness-110 ease-in-out'  />
        <button onClick={() => setAuthComponent(true)} className='login-screen__button fixed top-5 right-5 text-white px-5 py-3 text-base bg-netflix font-semibold rounded-sm hover:brightness-90 ease-in-out'>Sign In</button>
        <div className='login-screen__gradient w-full h-screen bg-[#00000066]' />
      </div>
      <main className='login-screen__body z-10 text-white p-5 absolute top-[30%] w-full text-center'>
        {
          authComponent ? (
            <AuthComponent email={signUpEmail} />
          ) : (
            <CTAComponent signUp={handleSignUp}/>
          )
          
        }
      </main>
    </div>
  )
}
