import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Author, Startup } from '@/sanity/types'

export type StartupCardType = Omit<Startup,'author'> & {author?:Author}

const StartupCard = ({post}:{post:StartupCardType}) => {
  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_date'>
                {formatDate(post?._createdAt)}
            </p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-6 text-primary'/>
                <span className='text-16-medium'>{post?.views}</span>
            </div>
        </div>
        <div className='flex-between mt-5 gap-4'>
            <div className='flex-1'>
                <Link href={`/user/${post && post?.author?._id}`}>
                    <p className='text-16-medium line-clamp-1'>{post.author?.name}</p>
                </Link>
                <Link href={`/startup/${post?._id}`}>
                    <p className='text-16-medium line-clamp-1'>{post.title}</p>
                </Link>
            </div>
            <Link href={`/user/${post.author?._id}`}>
                <Image src={'https://placehold.co/48x48'} width={48} height={48} className='rounded-full' alt='avatar'/>
            </Link>
        </div>
        <Link href={`/startup/${post?._id}`}>
            <p className='startup-card_desc'>
                {post.description}
            </p>
            <img src={post && post.image} width={100} height={100} alt="image" className='startup-card_img' />
        </Link>
        <div className='flex-between mt-5 gap-3'>
            <Link href={`?query=${post.category?.toLowerCase()}`}>
                <p className='text-16-medium'>{post.category}</p>
            </Link>
            <Button className='startup-card_btn' asChild>
                <Link href={`/startup/${post._id}`}>Details</Link>
            </Button>
        </div>
    </li>
  )
}

export default StartupCard