import {auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth()
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href={'/'}>
                <Image src={'/logo.png'} alt='logo' width={120} height={10}/>
            </Link>

            <div className='flex items-center gap-5 text-black'>
                {
                    (session && session.user) ?
                    <div className='flex gap-3'>
                        <Link href={'/startup/create'}><span>Create</span></Link>
                        <form action={
                            async()=>{
                                "use server";
                                await signOut();
                            }
                        }>
                            <button type='submit'>Logout</button>
                        </form>
                        
                        <Link href={`/user/${session.id}`}><span>{session.user.name}</span></Link>
                    </div>
                    :
                    <div>
                        <form action={
                            async()=>{
                                "use server";
                                await signIn("github", { redirectTo: "/" })
                                }}>
                            <button type='submit'>
                                <span className='text-black cursor-pointer'>Login</span>
                            </button>
                        </form>
                    </div>
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar