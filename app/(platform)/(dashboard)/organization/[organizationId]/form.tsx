'use client'
import { createBoard } from '@/actions/create-board/index'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAction } from '@/hooks/use-action'
import React, { useActionState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const Form = () => {
  const { execute, fieldErrors, isLoading} = useAction(createBoard,{
    onSuccess: (data) => console.log(`Succcess: ${data}`),
    onError: (data) => console.log(`Error: ${data}`)
    
  });
  const onSubmit = (formData:FormData) => {
    const  title  = formData.get('title') as string;
    execute({ title })
  }
  return (
    <form action={onSubmit}>
        <div className='flex flex-col space-y-2'>
        <Input 
            type="text" 
            name='title'
            required
            placeholder='board title'
        />
        <div>
            {fieldErrors?.title?.map((error) => (
                <p key={error} className='text-rose-500'>
                    {error}
                </p>
            ))}
        </div>
        <Button disabled={isLoading} size='sm' type='submit'>
            Submit
        </Button>
        </div>
    </form>
  )
}

export default Form