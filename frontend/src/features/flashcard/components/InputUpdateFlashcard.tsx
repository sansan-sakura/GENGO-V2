import { Dispatch, SetStateAction, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'

import { Input } from '../../../ui/shadcn/Input'
import { CardType } from '../../../types/flashcardTypes'
import { useEditFlashcard } from '../hooks/useEditFlashcard'

import { SetterOrUpdater, useRecoilState } from 'recoil'
import { subModalIdState } from '../../../atoms/commonAtoms'
import { Dialog, DialogContent, DialogHeader } from '../../../ui/shadcn/Dialog'
import { ButtonSubmit } from '../../../ui/buttons/Button/ButtonSubmit'

export const InputUpdateFlashcard = ({
  cards: propsCards,
}: {
  cards: Array<CardType> | []
}) => {
  const [modalId, setModalId] = useRecoilState(subModalIdState)

  const cards =
    propsCards?.length === 0 || !propsCards
      ? [
          {
            _id: '1',
            answer: 'hjkhjksghjgjssghjghsjghjsghjghjg',
            question: 'ghutossgjhgsjhgshghjhgshukgshjkghj',
          },
        ]
      : propsCards
  return (
    <div>
      <ul>
        {cards.map((card) => (
          <>
            <li className='flex min-h-[46px] items-center gap-4 px-2 py-1 text-sm font-semibold'>
              <div className='grid w-full grid-cols-[48%_48%_1fr] items-end'>
                <div className='flex flex-col  gap-1 overflow-hidden pr-1'>
                  <span className='text-xs font-semibold text-blue-dark'>question</span>
                  <p className='max-h-full truncate'>{card.question}</p>
                </div>
                <div className='flex flex-col gap-1 pr-1'>
                  <span className='text-xs font-semibold text-blue-dark'>answer</span>
                  <p className='max-h-full truncate'>{card.answer}</p>
                </div>
                <button
                  onClick={() => {
                    // setIsEditing(card._id ?? '')
                    setModalId(`updateFlashcard/${card._id}`)
                  }}
                >
                  <BiEditAlt className='text-base text-stone-400 transition-colors duration-300 hover:text-stone-700' />
                </button>
              </div>
            </li>
            {modalId === `updateFlashcard/${card._id}` && (
              <InputItem
                defaultValue={card.question}
                defaultValueAnswer={card.answer}
                // onEditing={setIsEditing}
                id={card._id ?? ''}
                isOpen={modalId === `updateFlashcard/${card._id}`}
                onClose={setModalId}
              />
            )}
          </>
        ))}
      </ul>
    </div>
  )
}

function InputItem({
  defaultValue,
  defaultValueAnswer,
  onEditing,
  id,
  isOpen,
  onClose,
}: {
  id: string
  isOpen: boolean
  onClose: SetterOrUpdater<string>
  defaultValue: string
  defaultValueAnswer: string
  onEditing?: Dispatch<SetStateAction<string>>
}) {
  const [updatedQuestion, setUpdatedQuestion] = useState(defaultValue)
  const [updatedAnswer, setUpdatedAnswer] = useState(defaultValueAnswer)
  const { isEditing, editFlashcard, isError } = useEditFlashcard()

  const handleCategoryUpdate = () => {
    if (updatedAnswer === '' || updatedQuestion === '') return

    const newFlashcard = {
      id,
      newData: { question: updatedQuestion, answer: updatedAnswer },
    }

    editFlashcard(newFlashcard)
    setUpdatedAnswer('')
    setUpdatedQuestion('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={(prev) => onClose('')}>
      <DialogContent>
        <DialogHeader className='text-lg font-semibold'>Update Flashcard</DialogHeader>
        <div>
          <span className='text-xs font-semibold text-blue-dark'>Question</span>
          <Input
            onChange={(e) => setUpdatedQuestion(e.target.value)}
            value={updatedQuestion}
          />
        </div>
        <div className='mb-2'>
          <span className='text-xs font-semibold text-blue-dark'>Answer</span>
          <Input
            onChange={(e) => setUpdatedAnswer(e.target.value)}
            value={updatedAnswer}
          />
        </div>
        <ButtonSubmit
          onClick={handleCategoryUpdate}
          isError={isError}
          isloading={isEditing}
        >
          Update
        </ButtonSubmit>
      </DialogContent>
    </Dialog>
  )
}
