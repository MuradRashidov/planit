'use client'
import { createBoard } from '@/actions/create-board/index'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
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
        <FormInput id='title' errors={fieldErrors} label='Board Title'/>
        <FormSubmit className='bg-red-500 hover:bg-red-600 transition'>
          Save
        </FormSubmit>
        </div>
    </form>
  )
}

export default Form