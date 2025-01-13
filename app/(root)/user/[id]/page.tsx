import UserStartups from '@/app/components/UserStartups'
import { auth } from '@/auth'
import { client } from '@/sanity/lib/client'
import { STARTUP_QUERIES } from '@/sanity/lib/queries'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

export const experimental_ppr = true

const page = async({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    const session =  await auth()
    const user = await client.fetch(STARTUP_QUERIES.fetchUserById,{id})
    
    if (!user) return notFound()
  return (
    <>
        <section className='profile_container'>
            <div className='profile_card !bg-pink-500'>
                <div className='profile_title'>
                    <h3 className='text-24-black uppercase text-center line-clamp-1'>{user?.name}</h3>
                </div>
                <Image
                    src={user.image}
                    alt='user image'
                    width={200}
                    height={200}
                    className='profile_image'
                />
                <p className='text-30-extrabold mt-6 text-center'>@{user?.username}</p>
                <p className='text-14-normal mt-6 text-center'>{user?.bio}</p>
                
            </div>
            <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
                    <p className='text-30-bold'>
                        {session?.id===id ? 'Your':'All'} Startups
                    </p>
                    <ul className='card-grid_sm'>
                        <Suspense fallback={<p>Loading...</p>}>
                         <UserStartups  id={id}/>
                        </Suspense>
                        
                    </ul>
                </div>
        </section>
    </>
  )
}

export default page