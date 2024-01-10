import { useState } from 'react'
import { Label } from '../../../ui/shadcn/Label'
import { Input } from '../../../ui/shadcn/Input'
import { ButtonSubmit } from '../../../ui/buttons/Button/ButtonSubmit'
import { useCreateFlashcard } from '../hooks/useCreateFlashcard'

type Props = {
  deckId: string
}

export const InputCreateFlashcard = ({ deckId }: Props) => {
  const [questionValue, setQuestionValue] = useState('')
  const [answerValue, setAnswerValue] = useState('')
  const { isCreating, createFlashcard, isError } = useCreateFlashcard()

  const handleSubmit = () => {
    if (deckId === undefined) return
    if (questionValue === '' || answerValue == '')
      return alert('Please fill answer and question')
    const newData = { question: questionValue, answer: answerValue, deck: deckId }
    createFlashcard(newData)
    setAnswerValue('')
    setQuestionValue('')
  }

  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='flex w-full flex-col gap-2'>
        <Label>New Flashcard</Label>
        {/* <Input
          onChange={(e) => setNewCategoryvalue(e.target.value)}
          value={newCategoryValue}
        /> */}
      </div>
      <ButtonSubmit onClick={handleSubmit} isloading={isCreating} isError={isError}>
        Submit
      </ButtonSubmit>
    </div>
  )
}
