import {z} from 'zod'

export const formSchema = z.object({
    title:z.string().min(5,"The title should be atleast of 5 words").max(20),
    description:z.string().min(20,"The description should be atleast of 20 words").max(200),
    category:z.string().min(5,"The title should be atleast of 5 words").max(20),
    image:z.string().url().refine(async(url)=>{
        try {
            const res = await fetch(url,{method:'HEAD'})
            const contentType = res.headers.get("Content-Type")
            return contentType?.startsWith('image/')
            
        } catch {
            return false
        }
    }),
    pitch:z.string().min(1,'pitch is required')
})