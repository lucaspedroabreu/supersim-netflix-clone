import { FormEvent } from "react";

type CTAProps = {
  signUp: (email: string) => void;
}

export function CTAComponent({signUp}: CTAProps) {
  return (
    <>
      <h1 className='text-5xl mb-5 font-bold'>Unlimited films, TV programmes and more.</h1>
      <h2 className='text-3xl font-normal mb-8'>Watch anywhere. Cancel at any time.</h2>
      <p className='text-xl mb-[0.1rem]'>Ready to watch? Enter your email to create or restart your membership.</p>
      <div className='login-screen__input'>
        <form>
          <input className='p-3 outline-none text-black h-14 w-1/3 border-none max-w-xl rounded-l-[0.2rem]' type="email" placeholder='Email Adress' />
          <button onClick={(e: FormEvent<HTMLButtonElement>) => signUp(e.currentTarget.value)} className='login-screen__get-started outline-none px-5 py-4 bg-netflix text-base color-white border-none rounded-r-[0.2rem] font-bold hover:brightness-90 ease-in-out'>GET STARTED</button>
        </form>
      </div>
    </>
  )
}
