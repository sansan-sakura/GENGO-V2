import { Input } from '../../../ui/shadcn/Input'
import { Label } from '../../../ui/shadcn/Label'
import { Toaster } from '../../../ui/shadcn/toaster'
import { ButtonSubmit } from '../../../ui/buttons/Button/ButtonSubmit'

import { SelectCategory } from '../../../ui/generic/SelectCategory'
import { useState } from 'react'
import { useEditDeck } from '../hooks/useEditDeck'

type Props = {
  deckId?: number | string
  defaultTitle?: string
  defaultCategory?: string
}

export const InputEditDeck = ({ deckId, defaultTitle, defaultCategory }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory ?? '')
  const [title, setTitle] = useState(defaultTitle ?? '')
  const { isEditing, editDeck, isError } = useEditDeck()

  const handleDeckCreate = () => {
    if (selectedCategory === '' || title === '' || !deckId) return
    const updatedDeck = { category: selectedCategory, title }
    editDeck({ id: deckId, newData: updatedDeck })
  }
  return (
    <>
      <Toaster />
      <form className='flex flex-col items-center gap-10'>
        <div className='flex w-full flex-col gap-2'>
          <div className='ml-auto'>
            <SelectCategory
              onChange={(value) => setSelectedCategory(value)}
              defaultValue={selectedCategory}
            />
          </div>
          <Label>Title</Label>
          <Input onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <ButtonSubmit isError={isError} isloading={isEditing} onClick={handleDeckCreate}>
          Submit
        </ButtonSubmit>
      </form>
    </>
  )
}
