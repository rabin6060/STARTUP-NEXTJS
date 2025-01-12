"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createStartUp } from '@/lib/actions';
import { formSchema } from '@/lib/validation';
import { Send } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useActionState, useState } from 'react'
import { toast } from 'sonner';
import {z} from 'zod'

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
  );

type formState = {
    error:string,
    status:'INITIAL' | 'FAILED' | 'SUCCESS'
}

const initialState:formState ={
    error : '',
    status: 'INITIAL'
}

const StartupForm = () => {
    const [errors,setErrors] = useState<Record<string,string>>({})
    const [value,setValue] = useState("")
    const router = useRouter()

    const submitForm =async (prev : formState ,formData :FormData):Promise<formState> => {
        try {
            const formValues = {
                title:formData.get("title") as string,
                description:formData.get("description") as string,
                category:formData.get("category") as string,
                image:formData.get("image") as string,
                pitch:value
            }
            await formSchema.parseAsync(formValues)
            const result = await createStartUp(formData,value)
            if (result.status == 'SUCCESS') {
                toast("startup created successfully")
                router.push(`/startup/${result._id}`)
            }
            return result
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors
                setErrors(fieldErrors as unknown as Record<string,string>)

                return {...prev,error:'validation failed',status:'FAILED'}
            }
            return {...prev,error:"unexpected error",status:'FAILED'}

        }
        
    }

    const [state,formAction,isPending] = useActionState(submitForm,initialState)
    console.log(state)
  return (
    <form action={formAction} className='startup-form'>
        <div>
            <label htmlFor='title' className='startup-form_label'>Title</label>
            <Input id='title' name='title' className='startup-form_input' placeholder='Enter title.' required/>
            {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>
        <div>
            <label htmlFor='description' className='startup-form_label'>Description</label>
            <Textarea id='description' name='description' className='startup-form_input' placeholder='Startup description' required/>
            {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>
        <div>
            <label htmlFor='category' className='startup-form_label'>Category</label>
            <Input id='category' name='category' className='startup-form_input' placeholder='Startup category.' required/>
            {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>
        <div>
            <label htmlFor='image' className='startup-form_label'>Image Link</label>
            <Input id='image' name='image' className='startup-form_input' placeholder='Startup Image link.' required/>
            {errors.image && <p className='startup-form_error'>{errors.image}</p>}
        </div>
        <div data-color-mode="light">
            <label htmlFor='pitch' className='startup-form_label'>Pitch</label>
            <MDEditor 
                value={value} 
                onChange={(value)=>setValue(value as string)} 
                id='pitch'
                preview='edit'
                height={300}
                style={{borderRadius:'20px',overflow:'hidden'}}
                textareaProps={{
                    placeholder:"Briefly describe your idea and problem"
                }}
                />
            {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
        </div>
        <Button type='submit' className='startup-form_btn' disabled={isPending}>
            {isPending ? 'Submitting...':"Submit your startup"}
            <Send size={5} color='pink' />
        </Button>
    </form>
  )
}

export default StartupForm