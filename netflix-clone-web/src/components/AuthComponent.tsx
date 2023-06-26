import { useState, useRef, useEffect } from 'react'
import type { FormEvent } from 'react'

import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth/cordova'

type AuthComponentProps = {
  email: string
}


export function AuthComponent({ email }: AuthComponentProps) {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const auth = getAuth()
  const navigate = useNavigate()
  
  const [formError, setFormError] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    setEmailInput(email)
  }, [email, auth])

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (isSignUp) {
      if (!emailInput || !passwordInput || !passwordConfirmation) return

      if (passwordInput !== passwordConfirmation) {
        setFormError({
          ...formError,
          passwordConfirmation: "Passwords do not match"
        })

        return
      } else {
        await createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        setEmailInput("")
        setPasswordInput('')
        setPasswordConfirmation('')
      }

    } else {
      if (!emailInput || !passwordInput) return
      await signInWithEmailAndPassword(auth, emailInput, passwordInput)
      setEmailInput("")
      setPasswordInput('')
      
    }
  }

  return (
    <div className='max-w-md p-16 mx-auto bg-[#000000d9]'>
      <form className='grid flex-col'>
        <h3 className='text-left mb-7 text-4xl font-bold'>{isSignUp ? "Sign Up" : "Sign In"}</h3>
        <input value={emailInput} onChange={(e) => setEmailInput(e.currentTarget.value)} className='ouline-none h-10 mb-4 px-4 py-1 rounded-sm border-none outline-none focus:outline-netflix text-black' placeholder='Email' type="email" />
        {formError.email ? <span className='text-netflix'>{formError.email}</span> : ''}
        <input value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className='ouline-none h-10 mb-4 px-4 py-1 rounded-sm border-none outline-none focus:outline-netflix ouline-netflix text-black' placeholder='Password' type="password" />
        {formError.password ? <span className='text-netflix'>{formError.password}</span> : ''}
        {
          isSignUp &&
          <>
            <input value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className='ouline-none h-10 mb-4 px-4 py-1 rounded-sm border-none outline-none focus:outline-netflix ouline-netflix text-black' placeholder='Confirm Password' type="password" />
            {formError.passwordConfirmation ? <span className='text-netflix'>{formError.passwordConfirmation}</span> : ''}
          </> 
        }
        <button onClick={(e) => handleSubmit(e)} className='p-4 text-base text-white bg-netflix mt-3' type="submit">{isSignUp ? "Register now" : "Sign In"}</button>

        <h4 className='text-left mt-4 font-semibold'>
          {
            !isSignUp ? 
              (<>
                <span className='text-gray-500'>New to Netflix?</span>
                <a onClick={() => setIsSignUp(true)} className='cursor-pointer ml-2 hover:underline'>Sign Up now</a>.
              </>) : 
              (<>
                <span className='text-gray-500'>Have an account?</span>
                <a onClick={() => setIsSignUp(false)} className='cursor-pointer ml-2 hover:underline'>Sign In</a>.
              </>)
          }
        </h4>
      </form>
    </div>
  )
}
