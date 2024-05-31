import { Input } from '../../../ui/shadcn/Input'
import { Label } from '../../../ui/shadcn/Label'
import { Toaster } from '../../../ui/shadcn/toaster'
import { ButtonSubmit } from '../../../ui/buttons/Button/ButtonSubmit'

import { SelectCategory } from '../../../ui/generic/SelectCategory'
import { ChangeEvent, useState } from 'react'
import { useCreateDeck } from '../hooks/useCreateDeck'
import { modalIDstate } from '../../../atoms/commonAtoms'
import { useRecoilState } from 'recoil'
import { useToast } from '../../../ui/shadcn/use-toast'

export const InputCreateDeck = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [title, setTitle] = useState('')
  const { isCreating, createDeck, isError } = useCreateDeck()
  const [modalId, setModalId] = useRecoilState(modalIDstate)
  const { toast } = useToast()

  const handleDeckCreate = () => {
    const newdeck = { category: selectedCategory, title }
    createDeck(newdeck)
    setModalId('')
  }
  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='flex w-full flex-col gap-2'>
        <div className='mb-2 ml-auto'>
          <SelectCategory onChange={(value) => setSelectedCategory(value)} />
        </div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <ButtonSubmit onClick={handleDeckCreate} isError={isError} isloading={isCreating}>
        Submit
      </ButtonSubmit>
    </div>
  )
}
