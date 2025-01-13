import { formatDate } from '@/lib/utils'
import { STARTUP_QUERIES } from '@/sanity/lib/queries'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import markdown from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/app/components/View'
import { client } from '@/sanity/lib/client'
import StartupCard, { StartupCardType } from '@/app/components/StartupCard'

const md = markdown()

export const experimental_ppr = true

const page = async({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    
    const [post, { select: editorPosts }] = await Promise.all([
        client.fetch(STARTUP_QUERIES.singleStartup, { id }),
        client.fetch(STARTUP_QUERIES.playlists_by_slug_query, {
          slug: "editor",
        }),
      ]);
    if(!post) return notFound()
    const startup = post
    console.log(startup)
    const parsedContent = md.render(startup.pitch)
    console.log(editorPosts)
  return (
    <>
        <section className='pink_container !bg-pink-500 !min-h-[200px]'>
            <p className='tag !bg-yellow-200'>{formatDate(startup._createdAt)}</p>
            <h1 className='heading'>{startup.title}</h1>
            <p className='sub-heading !max-w-5xl'>{startup?.description}</p>
        </section>
        <section className='section_container'>
            <img src={startup.image} alt="image" className='w-full h-full rounded-xl' />

            <div className='max-w-4xl mt-10 mx-auto space-y-5'>
                <div className='flex-between gap-5'>
                    <Link href={`/author/${startup.author._id}`} className='flex gap-2 items-center'>
                        <img src={startup.author.image} className='w-[60px] h-[60px] rounded-full drop-shadow-lg' alt='logo' />
                        <div>
                            <p className='text-20-medium'>{startup.author.name}</p>
                            <p className='text-16-medium !text-black-300'>@{startup.author.username}</p>
                        </div>
                        
                    </Link>
                    <p className='category-tag'>{startup.category}</p>
                </div>
                <h3 className='text-30-bold'>Pitch Details</h3>
                {parsedContent ?
                <article className='prose font-work-sans max-w-4xl break-all'
                dangerouslySetInnerHTML={{__html:parsedContent}}
                    /> :
                    <p className='no-result'>No content</p>
             }
            </div>
            <hr className='divider'/>
            {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupCardType, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

            {/* dynamic content section using ppr */}
            <section>
                <Suspense fallback={<Skeleton className='view_skeleton'/>} >
                    <View id={id}/>
                </Suspense>
            </section>
        </section>
    </>
  )
}

export default page