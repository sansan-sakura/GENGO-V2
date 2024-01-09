import { useState } from 'react'
import { ButtonSubmit } from '../../../ui/buttons/Button/ButtonSubmit'
import { Input } from '../../../ui/shadcn/Input'
import { Label } from '../../../ui/shadcn/Label'
import { Toaster } from '../../../ui/shadcn/toaster'
import { useCreateCategory } from '../category/useCreateCategory'

export const InputCreateCategory = () => {
  const { isCreating, createCategory } = useCreateCategory()
  const [newCategoryValue, setNewCategoryvalue] = useState('')
  const handleSubmit = () => {
    if (newCategoryValue === '') return
    createCategory({ category: newCategoryValue })
    setNewCategoryvalue('')
  }
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='flex w-full flex-col gap-2'>
        <Label>New Category</Label>
        <Input
          onChange={(e) => setNewCategoryvalue(e.target.value)}
          value={newCategoryValue}
        />
      </div>
      <ButtonSubmit onClick={handleSubmit} isloading={isCreating}>
        Submit
      </ButtonSubmit>
    </div>
  )
}
