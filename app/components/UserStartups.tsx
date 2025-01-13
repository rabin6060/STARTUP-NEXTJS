import { client } from '@/sanity/lib/client'
import { STARTUP_QUERIES } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupCardType } from './StartupCard'



const UserStartups = async ({id}:{id:string}) => {
    const startups = await client.fetch(STARTUP_QUERIES.startups_by_user,{id})
    console.log(startups)
  return (
    <>
        {
           startups.length>0 && startups.map((startup:StartupCardType)=>(
                <StartupCard key={startup._createdAt} post={startup}/>
            ))
        }
    </>
  )
}

export default UserStartups