import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'

 
export default function SearchForm({query}:{query?:string}) {
  return (
    <Form action="/" scroll={false} className='search-form'>
        <input type="text" placeholder='Search startups' defaultValue={query} name='query' className='search-input' />
        

            <div className='flex gap-3'>
                {query && <SearchFormReset/>}
            
                <button type='submit' className='search-btn text-white'>
                    <Search size={20}/>
                </button>
            </div>
        
        
    </Form>
  )
}