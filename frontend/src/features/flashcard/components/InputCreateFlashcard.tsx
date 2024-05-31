import { useState } from 'react'
import { Label } from '../../../ui/shadcn/Label'
import { Input } from '../../../ui/shadcn/Input'
import { ButtonSubmit } from '../../../ui/buttons/Button/ButtonSubmit'
import { useCreateFlashcard } from '../hooks/useCreateFlashcard'
import { useSetRecoilState } from 'recoil'
import { modalIDstate } from '../../../atoms/commonAtoms'

type Props = {
  deckId: string
}

export const InputCreateFlashcard = ({ deckId }: Props) => {
  const [questionValue, setQuestionValue] = useState('')
  const [answerValue, setAnswerValue] = useState('')
  const { isCreating, createFlashcard, isError } = useCreateFlashcard()
  const setModalId = useSetRecoilState(modalIDstate)

  const handleSubmit = () => {
    if (deckId === undefined) return
    if (questionValue === '' || answerValue == '')
      return alert('Please fill answer and question')
    const newData = { question: questionValue, answer: answerValue, deck: deckId }
    createFlashcard(newData)
    setAnswerValue('')
    setQuestionValue('')
    setModalId('')
  }

  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='flex w-full flex-col gap-2'>
        <Label>Question</Label>
        <Input onChange={(e) => setQuestionValue(e.target.value)} value={questionValue} />
      </div>
      <div className='flex w-full flex-col gap-2'>
        <Label>Answer</Label>
        <Input onChange={(e) => setAnswerValue(e.target.value)} value={answerValue} />
      </div>
      <ButtonSubmit onClick={handleSubmit} isloading={isCreating} isError={isError}>
        Submit
      </ButtonSubmit>
    </div>
  )
}
