import StartupForm from '@/app/components/StartupForm'
import React from 'react'

const page = () => {
  return (
    <>
        <section className='pink_container !bg-pink-500 !min-h-40'>
            <h1 className='heading'>SUBMIT YOUR STARTUP</h1>
        </section>
        <StartupForm />
    </>
  )
}

export default page