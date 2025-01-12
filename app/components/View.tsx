import React from 'react'
import Ping from './Ping'
import { STARTUP_QUERIES } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/write-client'
import { after} from 'next/server'

const View = async ({id}:{id:string}) => {
    
    const startup = await client.fetch(STARTUP_QUERIES.fetchViews,{id})
    if(!startup) return notFound()
    
        after(async () => {
            try {
              await writeClient
                .patch(id) // Document ID to update
                .setIfMissing({views:0})
                .inc({ views: 1 }) // Increment views by 1
                .commit(); // Commit the changes
             
            } catch (error) {
              console.error('Error updating views:', error);
            }
          });
    
  return (
    <div className='view-container'>
        <div className='absolute -top-2 right-2'>
            <Ping />
        </div>
        <p className='view-text'>
            <span className='font-black'>{startup.views} views</span>
        </p>
    </div>
  )
}

export default View