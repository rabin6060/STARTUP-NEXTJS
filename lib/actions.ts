"use server"

import { auth } from "@/auth"
import { parseResponse } from "./utils"
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client"

export const createStartUp = async (form:FormData,pitch:string) =>{
    const session = await auth()

    if (!session) {
        //cannot directly return the object , so we have to parse it after stringify
        return parseResponse({error:'you are not logged in',status:'FAILED'})
    }

    const {title,description,category,image} = Object.fromEntries(
        Array.from(form).filter(([key])=>key!=='pitch')
    )

    const slug = slugify(title as string,{
        lower:true,
        strict:true
    })
    try {
        const startup = {
            title,
            description,
            category,
            image,
            slug:{
                _type:slug,
                current:slug
            },
            author:{
                _type:"reference",
                _ref:session?.id
            },
            pitch
        }
        const result =await writeClient.create({_type:"startup",...startup})
        return parseResponse({...result,error:'',status:'SUCCESS'})
        
    } catch (error) {
        console.log(error)
        return parseResponse({error:JSON.stringify(error),status:'FAILED'})
    }


}