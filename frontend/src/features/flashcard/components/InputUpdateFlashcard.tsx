import { Dispatch, SetStateAction, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'

import { Input } from '../../../ui/shadcn/Input'
import { CardType } from '../../../types/flashcardTypes'
import { useEditFlashcard } from '../hooks/useEditFlashcard'

import { SetterOrUpdater, useRecoilState } from 'recoil'
import { subModalIdState } from '../../../atoms/commonAtoms'
import { Dialog, DialogContent, DialogHeader } from '../../../ui/shadcn/Dialog'
import { ButtonSubmit } from '../../../ui/buttons/Button/ButtonSubmit'
import { AiFillDelete } from 'react-icons/ai'
import { useDeleteFlashcard } from '../hooks/useDeleteFlashcard'

export const InputUpdateFlashcard = ({ cards }: { cards: Array<CardType> | [] }) => {
  const [modalId, setModalId] = useRecoilState(subModalIdState)
  const { isDeleting, deleteFlashcard } = useDeleteFlashcard()
  if (cards.length === 0) return <p>No cards to update</p>
  return (
    <div>
      <ul className='flex max-h-[400px] flex-col gap-4 overflow-y-scroll'>
        {cards.map((card) => (
          <>
            <li className='flex items-center gap-4 rounded-md border border-blue-dark px-2.5 py-1.5 text-sm font-semibold'>
              <div className='flex w-full items-end justify-between'>
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col  gap-1 overflow-hidden pr-1'>
                    <span className='text-sm font-semibold text-blue-dark'>question</span>
                    <p className='max-h-full truncate'>{card.question}</p>
                  </div>
                  <div className='flex flex-col gap-1 pr-1'>
                    <span className='text-sm font-semibold text-blue-dark'>answer</span>
                    <p className='max-h-full truncate'>{card.answer}</p>
                  </div>
                </div>
                <div>
                  <button
                    disabled={isDeleting}
                    className='mr-2'
                    onClick={() => deleteFlashcard(card._id)}
                  >
                    <AiFillDelete className='text-lg text-stone-400 transition-colors duration-300 hover:text-stone-700' />
                  </button>
                  <button
                    onClick={() => {
                      // setIsEditing(card._id ?? '')
                      setModalId(`updateFlashcard/${card._id}`)
                    }}
                  >
                    <BiEditAlt className='text-lg text-stone-400 transition-colors duration-300 hover:text-stone-700' />
                  </button>
                </div>
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
          <span className='text-sm font-semibold text-blue-dark'>Question</span>
          <Input
            onChange={(e) => setUpdatedQuestion(e.target.value)}
            value={updatedQuestion}
          />
        </div>
        <div className='mb-2'>
          <span className='text-sm font-semibold text-blue-dark'>Answer</span>
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
