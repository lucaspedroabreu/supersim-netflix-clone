import { useState, useRef, useEffect } from 'react'
import type { FormEvent } from 'react'

import { auth } from '../../firebase'

type AuthComponentProps = {
  email: string
}

export function AuthComponent({ email }: AuthComponentProps) {
  const [emailInput, setEmailInput] = useState('')
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)

  const [formError, setFormError] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    setEmailInput(email)
  }, [email])

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (isSignUp) {
      if (!emailInput || !passwordRef.current || !passwordConfirmationRef.current) return

      if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
        setFormError({
          ...formError,
          passwordConfirmation: "Passwords do not match"
        })
      }
    } else {

    }
  }

  return (
    <div className='max-w-md p-16 mx-auto bg-[#000000d9]'>
      <form className='grid flex-col'>
        <h3 className='text-left mb-7 text-4xl font-bold'>{isSignUp ? "Sign Up" : "Sign In"}</h3>
        <input value={emailInput} onChange={(e) => setEmailInput(e.currentTarget.value)} className='ouline-none h-10 mb-4 px-4 py-1 rounded-sm border-none outline-none focus:outline-netflix text-black' placeholder='Email' type="email" />
        <input ref={passwordRef} className='ouline-none h-10 mb-4 px-4 py-1 rounded-sm border-none outline-none focus:outline-netflix ouline-netflix text-black' placeholder='Password' type="password" />
        {
          isSignUp &&
          <>
            <input ref={passwordConfirmationRef} className='ouline-none h-10 mb-4 px-4 py-1 rounded-sm border-none outline-none focus:outline-netflix ouline-netflix text-black' placeholder='Confirm Password' type="password" />
            {formError.passwordConfirmation ? <span className='text-netflix'>{formError.passwordConfirmation}</span> : ''}
          </> 
        }
        <button onClick={handleSubmit} className='p-4 text-base text-white bg-netflix mt-3' type="submit">{isSignUp ? "Register now" : "Sign In"}</button>

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
