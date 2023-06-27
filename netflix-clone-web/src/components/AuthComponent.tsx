import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth/cordova'
import { ZodError, z } from 'zod'
import { FirebaseError } from 'firebase/app'

export function AuthComponent() {
  /* UI Redering LOGIC */
  const [isSignUp, setIsSignUp] = useState(false)
  const isSignIn = !isSignUp

  /* FORM HANDLING SECTION */
  const [formData, setFormData] = useState({
    emailInput: "hello",
    passwordInput: "",
    passwordConfirmation: ""
  })
  const [formDataErrors, setFormDataErros] = useState<ZodError | null>(null)

  const handleFormData = (event: ChangeEvent<HTMLInputElement>, inputName: string) => {
    const inputData = event.currentTarget.value
    setFormData({
      ...formData,
      [inputName]: inputData ?? null
    })
  }

  /* AUTHENTICATION SECTION */
  const auth = getAuth()

  const loginSchema = z.object({
    email: z.string().nonempty('Email required').email("Email not valid!"),
    password: z.string().nonempty("Password required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{minlength,maxlength}$/, "Password must have at least one uppercase letter, one lowercase letter, one special character and one number")
  })

  const signUpSchema = loginSchema.extend({
    passwordConfirmation: z.string().min(1, "Must confirm your password")
  }).refine((formData) => formData.password === formData.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
  })

  const getErrorMessage = (fieldName: string) => {
    if (formDataErrors?.formErrors?.formErrors) {
      return formDataErrors.formErrors.fieldErrors[fieldName]![0];
    }
  }
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSignIn) {

      try {
        const signInData = loginSchema.safeParse(formData)

        if (signInData.success) {
          setFormDataErros(null)
          console.log(signInData.data)
        } else {
          setFormDataErros(signInData.error)
          throw new Error('Form Error')
        }

        const signedUser = await signInWithEmailAndPassword(auth, signInData.data.email, signInData.data.password)
        
        setFormData({
          emailInput: '',
          passwordInput: '',
          passwordConfirmation: ''
        })

        console.log(signedUser)
        return

      } catch (error) {
        if (error instanceof FirebaseError) {
          alert(`
            Authentication Error: ${error.name}
            Message: ${error.message}
          `)
          return
        }
        throw error
      }
    }

    if (isSignUp) {
      try {
        const signUpData = signUpSchema.safeParse(formData)

        if (signUpData.success) {
          setFormDataErros(null)
          console.log(signUpData.data)
        } else {
          setFormDataErros(signUpData.error)
          throw new Error("Form Error")
        }

        const createdUser = await createUserWithEmailAndPassword(auth, signUpData.data.email, signUpData.data.password)
        console.log(createdUser)

      } catch (error) {
        if (error instanceof FirebaseError) {
          alert(`
            Authentication Error: ${error.name}
            Message: ${error.message}
          `)
          return
        }
        throw error
      }

      setFormData({
        emailInput: '',
        passwordInput: '',
        passwordConfirmation: ''
      })
    }
  }

  return (
    <div className='max-w-md p-16 mx-auto bg-[#000000d9]'>
      <form onSubmit={handleSubmit} className='grid flex-col'>
        <h3 className='text-left mb-7 text-4xl font-bold'>{isSignUp ? "Sign Up" : "Sign In"}</h3>
        <input accept='' value={formData.emailInput} onChange={(e) => handleFormData(e, "emailInput")} className='ouline-none h-10 mb-4 px-4 py-1 rounded-sm border-none outline-none focus:outline-netflix text-black' placeholder='Email' type="email" />
        <span className='text-xs text-netflix font-medium'>{getErrorMessage("email")}</span>
        <input value={formData.passwordInput} onChange={(e) => handleFormData(e, "passwordInput")} className='ouline-none h-10 mb-4 px-4 py-1 rounded-sm border-none outline-none focus:outline-netflix ouline-netflix text-black' placeholder='Password' type="password" />
        <span className='text-xs text-netflix font-medium'>{getErrorMessage("password")}</span>
        {
          isSignUp &&
          <>
            <input value={formData.passwordConfirmation} onChange={(e) => handleFormData(e, "passwordConfirmation")} className='ouline-none h-10 mb-4 px-4 py-1 rounded-sm border-none outline-none focus:outline-netflix ouline-netflix text-black' placeholder='Confirm Password' type="password" />
            <span className='text-xs text-netflix font-medium'>{getErrorMessage("passwordConfirmation")}</span>
          </> 
        }
        <button className='p-4 text-base text-white bg-netflix mt-3' type="submit">{isSignUp ? "Register now" : "Sign In"}</button>

        <h4 className='text-left mt-4 font-semibold'>
          {
            isSignIn ? 
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
